import type { Employee } from "../../../models/Employee"

export type RotationTask = {
  id: string
  name: string
  requiredTraining?: string | null
  priority?: number
}

export type AssignmentHistoryEntry = {
  date: string
  employeeId: string
  taskId: string
}

export type RotationReason =
  | "SAME_TASK_CONSECUTIVE_DAY"
  | "EMPLOYEE_ALREADY_ASSIGNED"
  | "MISSING_REQUIRED_SKILL"
  | "INACTIVE_EMPLOYEE"
  | "NO_ELIGIBLE_EMPLOYEE"

export type PlannedAssignment = {
  taskId: string
  employeeId: string | null
  status: "AUTO_ASSIGNED" | "OPEN" | "MANUAL_ASSIGNED"
  reasons: RotationReason[]
}

export type UnassignedEmployee = {
  employeeId: string
  reasons: RotationReason[]
}

export type PlannerResult = {
  assignments: PlannedAssignment[]
  openTasks: RotationTask[]
  unassignedEmployees: UnassignedEmployee[]
}

export type RuleContext = {
  employee: Employee
  task: RotationTask
  date: string
  history: AssignmentHistoryEntry[]
  assignedEmployeeIds: Set<string>
}

export type RuleResult = {
  allowed: boolean
  reason?: RotationReason
}
