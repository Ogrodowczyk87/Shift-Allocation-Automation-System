import type { Employee, Slot } from '../../../models/Employee'

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
              {assignedEmployee ? (
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {assignedEmployee.firstName} {assignedEmployee.lastName}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Unassigned</p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
