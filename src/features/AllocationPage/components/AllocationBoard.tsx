import type { Employee, Slot } from '../../../models/Employee'
import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../../utils/employeeAvatar'

type AllocationBoardProps = {
  slots: Slot[]
  employeesById: Map<string, Employee>
}

export function AllocationBoard({ slots, employeesById }: AllocationBoardProps) {
  return (
    <section className="rounded-xl border border-sky-200 bg-white p-4">
      <h2 className="text-base font-semibold">Stations</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => {
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
                  src={assignedEmployee ? resolveEmployeePhotoUrl(assignedEmployee) : 'https://via.placeholder.com/36?text=%2B'}
                  alt={assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : 'Unassigned slot'}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = assignedEmployee
                      ? buildEmployeeAvatarUrl(assignedEmployee)
                      : 'https://via.placeholder.com/36?text=%2B'
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
        })}
      </div>
    </section>
  )
}
