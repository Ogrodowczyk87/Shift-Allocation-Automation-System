CREATE TABLE IF NOT EXISTS employees (
  employee_id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  active BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE employees
  ADD COLUMN IF NOT EXISTS trainings TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS photo_url TEXT,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);
CREATE INDEX IF NOT EXISTS idx_employees_deleted_at ON employees(deleted_at);
