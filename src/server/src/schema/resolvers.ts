import { db } from '../db/client.js'

type AddEmployeeArgs = {
  employeeId: string
  firstName: string
  lastName: string
}

export const resolvers = {
  Query: {
    health: async () => {
      await db.query('SELECT 1')
      return 'API is working'
    },

    employees: async () => {
      const result = await db.query(`
        SELECT id, employee_id, first_name, last_name, status, active
        FROM employees
        ORDER BY id DESC
      `)

      return result.rows.map((row) => ({
        id: row.id,
        employeeId: row.employee_id,
        firstName: row.first_name,
        lastName: row.last_name,
        status: row.status,
        active: row.active,
      }))
    },
  },

  Mutation: {
    addEmployee: async (_parent: unknown, args: AddEmployeeArgs) => {
      const result = await db.query(
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
  },
}
