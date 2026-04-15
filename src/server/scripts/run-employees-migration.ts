import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function main() {
  const sqlPath = resolve(process.cwd(), 'sql/alter-employees-for-production.sql')
  const sql = readFileSync(sqlPath, 'utf-8')

  await pool.query(sql)
  console.log('employees table migration executed successfully')

  const result = await pool.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'employees'
      AND column_name IN (
        'employee_id',
        'first_name',
        'last_name',
        'trainings',
        'photo_url',
        'deleted_at',
        'created_at',
        'updated_at'
      )
    ORDER BY column_name
  `)

  const columns = result.rows.map((row) => row.column_name)
  console.log('employees columns:', columns.join(', '))

  await pool.end()
}

main().catch((error) => {
  console.error('Failed to run employees migration:', error)
  process.exit(1)
})
