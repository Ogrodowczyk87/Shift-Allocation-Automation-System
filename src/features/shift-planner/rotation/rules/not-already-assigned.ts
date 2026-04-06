import { ROTATION_REASON } from "../reason-codes"
import type { RuleContext, RuleResult } from "../rotation.types"

export function notAlreadyAssignedRule(context: RuleContext): RuleResult {
  if (context.assignedEmployeeIds.has(context.employee.id)) {
    return {
      allowed: false,
      reason: ROTATION_REASON.EMPLOYEE_ALREADY_ASSIGNED,
    }
  }

  return { allowed: true }
}
