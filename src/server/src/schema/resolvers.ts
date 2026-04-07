import { db } from '../db/client.js'

type AddEmployeeArgs = {
  employeeId: string
  firstName: string
  lastName: string
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
  id: number
  employee_id: string
  first_name: string
  last_name: string
  status: string
  active: boolean
}

type AssignmentHistoryRow = {
  id: number
  assignment_date: string
  employee_id: string
  task_id: string
  assignment_type: string
  source: string
  created_at: string
}

export const resolvers = {
  Query: {
    health: async () => {
      await db.query('SELECT 1')
      return 'API is working'
    },

    employees: async () => {
      const result = await db.query<EmployeeRow>(`
        SELECT id, employee_id, first_name, last_name, status, active
        FROM employees
        ORDER BY id DESC
      `)

      return result.rows.map((row: EmployeeRow) => ({
        id: row.id,
        employeeId: row.employee_id,
        firstName: row.first_name,
        lastName: row.last_name,
        status: row.status,
        active: row.active,
      }))
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
        id: row.id,
        assignmentDate: row.assignment_date,
        employeeId: row.employee_id,
        taskId: row.task_id,
        assignmentType: row.assignment_type,
        source: row.source,
        createdAt: row.created_at,
      }))
    },
  },

  Mutation: {
    addEmployee: async (_parent: unknown, args: AddEmployeeArgs) => {
      const result = await db.query<EmployeeRow>(
        `
        INSERT INTO employees (employee_id, first_name, last_name, status, active)
        VALUES ($1, $2, $3, 'active', false)
        RETURNING id, employee_id, first_name, last_name, status, active
        `,
        [args.employeeId, args.firstName, args.lastName]
      )

      const row = result.rows[0]

      return {
        id: row.id,
        employeeId: row.employee_id,
        firstName: row.first_name,
        lastName: row.last_name,
        status: row.status,
        active: row.active,
      }
    },

    saveAssignmentHistory: async (_parent: unknown, args: SaveAssignmentHistoryArgs) => {
      const client = await db.connect()

      try {
        await client.query('BEGIN')

        const uniqueDates = [...new Set(args.entries.map((entry) => entry.assignmentDate))]

        for (const date of uniqueDates) {
          await client.query(
            `
            DELETE FROM assignment_history
            WHERE assignment_date = $1
            `,
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
