import type { Employee, Slot } from '../../../models/Employee'
import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../../utils/employeeAvatar'

type AllocationBoardProps = {
  slots: Slot[]
  employeesById: Map<string, Employee>
}

const UNASSIGNED_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">' +
      '<rect width="36" height="36" rx="18" fill="#e2e8f0"/>' +
      '<path d="M18 10v16M10 18h16" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>'
  )

export function AllocationBoard({ slots, employeesById }: AllocationBoardProps) {
  const aLeft = slots.filter(
    (slot) => slot.area === 'A' && slot.aisle >= 29 && slot.aisle <= 52
  )
  const aRight = slots.filter(
    (slot) => slot.area === 'A' && slot.aisle >= 1 && slot.aisle <= 28
  )
  const bLeft = slots.filter(
    (slot) => slot.area === 'B' && slot.aisle >= 1 && slot.aisle <= 26
  )
  const bRight = slots.filter(
    (slot) => slot.area === 'B' && slot.aisle >= 27 && slot.aisle <= 52
  )

  const renderSlot = (slot: Slot) => {
    const assignedEmployee = slot.assignetEmployeeId
      ? employeesById.get(slot.assignetEmployeeId)
      : undefined

    return (
      <article key={slot.id} className="rounded-lg border border-slate-200 p-3">
        <p className="text-xs font-semibold text-sky-700">
          Area {slot.area} / Location {slot.aisle}-{slot.location}
        </p>
        <div className="mt-3 flex items-center gap-3 rounded-md bg-slate-50 p-2">
          <img
            src={assignedEmployee ? resolveEmployeePhotoUrl(assignedEmployee) : UNASSIGNED_AVATAR}
            alt={assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : 'Unassigned slot'}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = assignedEmployee
                ? buildEmployeeAvatarUrl(assignedEmployee)
                : UNASSIGNED_AVATAR
            }}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {assignedEmployee
                ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
                : 'Unassigned'}
            </p>
            <p className="text-xs text-slate-500">
              {assignedEmployee ? `ID: ${assignedEmployee.id}` : 'ID: -'}
            </p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <section className="rounded-xl border border-sky-200 bg-white p-4">
      <h2 className="text-base font-semibold">Stations</h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Alejka A: 29-52</h3>
          <div className="space-y-3">{aLeft.map(renderSlot)}</div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Alejka A: 1-28</h3>
          <div className="space-y-3">{aRight.map(renderSlot)}</div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Alejka B: 1-26</h3>
          <div className="space-y-3">{bLeft.map(renderSlot)}</div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Alejka B: 27-52</h3>
          <div className="space-y-3">{bRight.map(renderSlot)}</div>
        </div>
      </div>
    </section>
  )
}
