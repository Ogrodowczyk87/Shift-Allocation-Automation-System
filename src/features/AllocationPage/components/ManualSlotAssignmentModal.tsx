import { useEffect, useMemo, useState } from 'react'
import type { Employee, Slot, SpecialTask } from '../../../models/Employee'

type ManualSlotAssignmentModalProps = {
  isOpen: boolean
  slots: Slot[]
  specialTasks: SpecialTask[]
  availableEmployees: Employee[]
  onClose: () => void
  onSave: (assignments: Record<string, string | null>) => void
}

export function ManualSlotAssignmentModal({
  isOpen,
  slots,
  specialTasks,
  availableEmployees,
  onClose,
  onSave,
}: ManualSlotAssignmentModalProps) {
  const activeSlots = useMemo(
    () => slots.filter((slot) => slot.active),
    [slots]
  )

  const [draftAssignments, setDraftAssignments] = useState<Record<string, string | null>>({})

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setDraftAssignments(
      Object.fromEntries(
        activeSlots.map((slot) => [slot.id, slot.assignetEmployeeId ?? null])
      )
    )
  }, [activeSlots, isOpen])

  const specialTaskAssignedIds = useMemo(
    () =>
      new Set(
        specialTasks
          .map((task) => task.assignedEmployeeId)
          .filter((employeeId): employeeId is string => Boolean(employeeId))
      ),
    [specialTasks]
  )

  if (!isOpen) {
    return null
  }

  const handleChangeAssignment = (slotId: string, employeeId: string) => {
    setDraftAssignments((current) => ({
      ...current,
      [slotId]: employeeId || null,
    }))
  }

  const handleSave = () => {
    onSave(draftAssignments)
    onClose()
  }

  const getEmployeeOptions = (slotId: string) => {
    const usedByOtherSlots = new Set(
      Object.entries(draftAssignments)
        .filter(([currentSlotId, employeeId]) => currentSlotId !== slotId && Boolean(employeeId))
        .map(([, employeeId]) => employeeId as string)
    )

    return availableEmployees.filter((employee) => {
      const isCurrentSelection = draftAssignments[slotId] === employee.id

      if (specialTaskAssignedIds.has(employee.id)) {
        return false
      }

      if (usedByOtherSlots.has(employee.id) && !isCurrentSelection) {
        return false
      }

      return true
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Manual slot assignment</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose which available employee should work on each active slot today.
          </p>
        </div>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto px-6 py-5">
          {activeSlots.length === 0 ? (
            <p className="text-sm text-slate-500">No active slots selected for today.</p>
          ) : (
            activeSlots.map((slot) => (
              <div
                key={slot.id}
                className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_240px]"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Area {slot.area} / Slot {slot.aisle}-{slot.location}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Only employees available today and not used in another slot are shown.
                  </p>
                </div>

                <select
                  value={draftAssignments[slot.id] ?? ''}
                  onChange={(event) => handleChangeAssignment(slot.id, event.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="">Unassigned</option>
                  {getEmployeeOptions(slot.id).map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.id})
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={activeSlots.length === 0}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save assignments
          </button>
        </div>
      </div>
    </div>
  )
}
