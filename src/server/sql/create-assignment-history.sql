CREATE TABLE IF NOT EXISTS assignment_history (
  id SERIAL PRIMARY KEY,
  assignment_date DATE NOT NULL,
  employee_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  assignment_type TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'AUTO_ASSIGNED',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
›