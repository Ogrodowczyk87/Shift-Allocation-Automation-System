import type { Employee } from '../../../models/Employee'

type ActiveEmployeesPanelProps = {
  employees: Employee[]
}

export function ActiveEmployeesPanel({ employees }: ActiveEmployeesPanelProps) {
  return (
    <section className="rounded-xl border border-sky-200 bg-white p-4">
      <h2 className="text-base font-semibold">Pool Employees</h2>
      <p className="mt-1 text-sm text-slate-600">Only active employees from the pool are allocated.</p>

      {employees.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No employees in pool.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {employees.map((employee) => (
            <li key={employee.id} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              <p className="font-medium text-slate-900">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-slate-500">#{employee.id}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
