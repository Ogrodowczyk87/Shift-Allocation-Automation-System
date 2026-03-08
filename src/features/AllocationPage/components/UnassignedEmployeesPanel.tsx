import type { Employee } from '../../../models/Employee'
import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../../utils/employeeAvatar'

type UnassignedEmployeesPanelProps = {
  employees: Employee[]
}

export function UnassignedEmployeesPanel({ employees }: UnassignedEmployeesPanelProps) {
  return (
    <section className="rounded-xl border border-amber-200 bg-white p-4">
      <h2 className="text-base font-semibold">Unassigned Employees</h2>
      <p className="mt-1 text-sm text-slate-600">Employees in pool who did not get any slot.</p>

      {employees.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">All pool employees are assigned.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {employees.map((employee) => (
            <li key={employee.id} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm">
              <img
                src={resolveEmployeePhotoUrl(employee)}
                alt={`${employee.firstName} ${employee.lastName}`}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = buildEmployeeAvatarUrl(employee)
                }}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-slate-900">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-slate-500">#{employee.id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
