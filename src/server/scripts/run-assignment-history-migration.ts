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
  const sqlPath = resolve(process.cwd(), 'sql/create-assignment-history.sql')
  const sql = readFileSync(sqlPath, 'utf-8')

  await pool.query(sql)
  console.log('assignment_history table migration executed successfully')

  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'assignment_history'
  `)

  if (result.rows.length > 0) {
    console.log('assignment_history table exists')
  } else {
    console.log('assignment_history table was not found')
  }

  await pool.end()
}

main().catch((error) => {
  console.error('Failed to run assignment_history migration:', error)
  process.exit(1)
})
