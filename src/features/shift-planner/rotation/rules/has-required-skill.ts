import { ROTATION_REASON } from "../reason-codes"
import type { RuleContext, RuleResult } from "../rotation.types"

export function hasRequiredSkillRule(context: RuleContext): RuleResult {
  const requiredTraining = context.task.requiredTraining

  if (!requiredTraining) {
    return { allowed: true }
  }

  const hasTraining = context.employee.trainings.includes(requiredTraining as never)

  if (!hasTraining) {
    return {
      allowed: false,
      reason: ROTATION_REASON.MISSING_REQUIRED_SKILL,
    }
  }

  return { allowed: true }
}
