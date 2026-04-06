import type { Employee } from "../../../models/Employee"
import { ROTATION_REASON } from "./reason-codes"
import type {
  AssignmentHistoryEntry,
  PlannerResult,
  RotationReason,
  RotationTask,
  RuleResult,
} from "./rotation.types"
import { hasRequiredSkillRule } from "./rules/has-required-skill"
import { noSameTaskConsecutiveDaysRule } from "./rules/no-same-task-consecutive-days"
import { notAlreadyAssignedRule } from "./rules/not-already-assigned"

function isEmployeeActive(employee: Employee): RuleResult {
  if (!employee.active) {
    return {
      allowed: false,
      reason: ROTATION_REASON.INACTIVE_EMPLOYEE,
    }
  }

  return { allowed: true }
}

function getRejectionReasons(params: {
  employee: Employee
  task: RotationTask
  date: string
  history: AssignmentHistoryEntry[]
  assignedEmployeeIds: Set<string>
}): RotationReason[] {
  const { employee, task, date, history, assignedEmployeeIds } = params

  const results = [
    isEmployeeActive(employee),
    notAlreadyAssignedRule({
      employee,
      task,
      date,
      history,
      assignedEmployeeIds,
    }),
    hasRequiredSkillRule({
      employee,
      task,
      date,
      history,
      assignedEmployeeIds,
    }),
    noSameTaskConsecutiveDaysRule({
      employee,
      task,
      date,
      history,
      assignedEmployeeIds,
    }),
  ]

  return results
    .filter((result) => !result.allowed && result.reason)
    .map((result) => result.reason as RotationReason)
}

export function planAssignments(params: {
  employees: Employee[]
  tasks: RotationTask[]
  date: string
  history: AssignmentHistoryEntry[]
}): PlannerResult {
  const { employees, tasks, date, history } = params

  const assignments: PlannerResult["assignments"] = []
  const openTasks: RotationTask[] = []
  const assignedEmployeeIds = new Set<string>()
  const rejectionReasonsByEmployee = new Map<string, Set<RotationReason>>()

  const sortedTasks = [...tasks].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  )

  for (const task of sortedTasks) {
    const eligibleEmployees = employees.filter((employee) => {
      const reasons = getRejectionReasons({
        employee,
        task,
        date,
        history,
        assignedEmployeeIds,
      })

      if (reasons.length > 0) {
        const existing =
          rejectionReasonsByEmployee.get(employee.id) ?? new Set<RotationReason>()

        reasons.forEach((reason) => existing.add(reason))
        rejectionReasonsByEmployee.set(employee.id, existing)
      }

      return reasons.length === 0
    })

    if (eligibleEmployees.length === 0) {
      assignments.push({
        taskId: task.id,
        employeeId: null,
        status: "OPEN",
        reasons: [ROTATION_REASON.NO_ELIGIBLE_EMPLOYEE],
      })

      openTasks.push(task)
      continue
    }

    const selectedEmployee = eligibleEmployees[0]

    assignedEmployeeIds.add(selectedEmployee.id)

    assignments.push({
      taskId: task.id,
      employeeId: selectedEmployee.id,
      status: "AUTO_ASSIGNED",
      reasons: [],
    })
  }

  const unassignedEmployees = employees
    .filter((employee) => employee.active && !assignedEmployeeIds.has(employee.id))
    .map((employee) => ({
      employeeId: employee.id,
      reasons: Array.from(rejectionReasonsByEmployee.get(employee.id) ?? []),
    }))

  return {
    assignments,
    openTasks,
    unassignedEmployees,
  }
}
