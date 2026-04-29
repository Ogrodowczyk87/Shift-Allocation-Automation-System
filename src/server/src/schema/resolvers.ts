import { randomUUID } from 'node:crypto'
import { db } from '../db/client.js'
import { createEmployeePhotoUpload } from '../storage/s3.js'

type AddEmployeeArgs = {
  input: {
    id: string
    firstName: string
    lastName: string
    photoUrl?: string | null
    trainings: string[]
    status: string
    active: boolean
  }
}

type ArchiveEmployeeArgs = {
  id: string
}

type CreateEmployeePhotoUploadArgs = {
  fileName: string
  fileType: string
  employeeId: string
}

type AssignmentHistoryArgs = {
  date: string
}

type SaveAssignmentHistoryArgs = {
  entries: {
    assignmentDate: string
    employeeId: string
    taskId: string
    assignmentType: string
    source: string
  }[]
}

type EmployeeRow = {
  employee_id: string
  first_name: string
  last_name: string
  photo_url: string | null
  trainings: string[]
  status: string
  active: boolean
  created_at: Date
  updated_at: Date
}

type AssignmentHistoryRow = {
  id: number
  assignment_date: Date
  employee_id: string
  task_id: string
  assignment_type: string
  source: string
  created_at: Date
}

function mapEmployee(row: EmployeeRow) {
  return {
    id: row.employee_id,
    firstName: row.first_name,
    lastName: row.last_name,
    photoUrl: row.photo_url,
    trainings: row.trainings ?? [],
    status: row.status,
    active: row.active,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }
}

export const resolvers = {
  Query: {
    health: async () => {
      await db.query('SELECT 1')
      return 'API is working'
    },

    employees: async () => {
      const result = await db.query<EmployeeRow>(`
        SELECT employee_id, first_name, last_name, photo_url, trainings, status, active, created_at, updated_at
        FROM employees
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
      `)

      return result.rows.map(mapEmployee)
    },

    assignmentHistory: async (_parent: unknown, args: AssignmentHistoryArgs) => {
      const result = await db.query<AssignmentHistoryRow>(
        `
        SELECT id, assignment_date, employee_id, task_id, assignment_type, source, created_at
        FROM assignment_history
        WHERE assignment_date = $1
        ORDER BY id ASC
        `,
        [args.date]
      )

      return result.rows.map((row) => ({
        id: String(row.id),
        assignmentDate: row.assignment_date.toISOString().slice(0, 10),
        employeeId: row.employee_id,
        taskId: row.task_id,
        assignmentType: row.assignment_type,
        source: row.source,
        createdAt: row.created_at.toISOString(),
      }))
    },
  },

  Mutation: {
    addEmployee: async (_parent: unknown, args: AddEmployeeArgs) => {
      const { input } = args

      const result = await db.query<EmployeeRow>(
        `
        INSERT INTO employees (
          employee_id,
          first_name,
          last_name,
          photo_url,
          trainings,
          status,
          active,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING employee_id, first_name, last_name, photo_url, trainings, status, active, created_at, updated_at
        `,
        [
          input.id,
          input.firstName,
          input.lastName,
          input.photoUrl ?? null,
          input.trainings,
          input.status,
          input.active,
        ]
      )

      return mapEmployee(result.rows[0])
    },

    archiveEmployee: async (_parent: unknown, args: ArchiveEmployeeArgs) => {
      const result = await db.query(
        `
        UPDATE employees
        SET deleted_at = NOW(), updated_at = NOW(), status = 'inactive', active = false
        WHERE employee_id = $1 AND deleted_at IS NULL
        `,
        [args.id]
      )

      return (result.rowCount ?? 0) > 0
    },

    createEmployeePhotoUpload: async (_parent: unknown, args: CreateEmployeePhotoUploadArgs) => {
      const allowedMimeTypes = new Set([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/heic',
        'image/heif',
      ])

      const normalizedEmployeeId = args.employeeId.trim()

      if (!normalizedEmployeeId) {
        throw new Error('Employee ID is required.')
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(normalizedEmployeeId)) {
        throw new Error('Invalid employee ID.')
      }

      if (!allowedMimeTypes.has(args.fileType)) {
        throw new Error('Unsupported image type.')
      }

      const fileExtension = args.fileName.includes('.')
        ? args.fileName.split('.').pop()
        : 'jpg'

      const safeExtension = fileExtension?.toLowerCase() ?? 'jpg'
      const fileKey = `employees/${normalizedEmployeeId}/${randomUUID()}.${safeExtension}`

      return createEmployeePhotoUpload({
        fileKey,
        fileType: args.fileType,
      })
    },

    saveAssignmentHistory: async (_parent: unknown, args: SaveAssignmentHistoryArgs) => {
      const client = await db.connect()

      try {
        await client.query('BEGIN')

        const uniqueDates = [...new Set(args.entries.map((entry) => entry.assignmentDate))]

        for (const date of uniqueDates) {
          await client.query(
            `DELETE FROM assignment_history WHERE assignment_date = $1`,
            [date]
          )
        }

        for (const entry of args.entries) {
          await client.query(
            `
            INSERT INTO assignment_history (
              assignment_date,
              employee_id,
              task_id,
              assignment_type,
              source
            )
            VALUES ($1, $2, $3, $4, $5)
            `,
            [
              entry.assignmentDate,
              entry.employeeId,
              entry.taskId,
              entry.assignmentType,
              entry.source,
            ]
          )
        }

        await client.query('COMMIT')
        return true
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    },
  },
}
