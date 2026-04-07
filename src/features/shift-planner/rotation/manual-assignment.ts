import type { Slot } from "../../../models/Employee"

export function applyManualAssignmentsToSlots(
  slots: Slot[],
  assignments: Record<string, string | null>
): Slot[] {
  return slots.map((slot) =>
    Object.prototype.hasOwnProperty.call(assignments, slot.id)
      ? {
          ...slot,
          assignetEmployeeId: assignments[slot.id] ?? null,
        }
      : slot
  )
}
