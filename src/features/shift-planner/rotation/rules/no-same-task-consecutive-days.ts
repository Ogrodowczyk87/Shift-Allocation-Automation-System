import { ROTATION_REASON } from "../reason-codes"
import type { AssignmentHistoryEntry, RuleContext, RuleResult } from "../rotation.types"

function getPreviousDay(dateString: string): string {
  const date = new Date(dateString)
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

function hadSameTaskYesterday(
  employeeId: string,
  taskId: string,
  date: string,
  history: AssignmentHistoryEntry[]
): boolean {
  const previousDay = getPreviousDay(date)

  return history.some((entry) => {
    return (
      entry.date === previousDay &&
      entry.employeeId === employeeId &&
      entry.taskId === taskId
    )
  })
}

export function noSameTaskConsecutiveDaysRule(
  context: RuleContext
): RuleResult {
  const blocked = hadSameTaskYesterday(
    context.employee.id,
    context.task.id,
    context.date,
    context.history
  )

  if (blocked) {
    return {
      allowed: false,
      reason: ROTATION_REASON.SAME_TASK_CONSECUTIVE_DAY,
    }
  }

  return { allowed: true }
}
