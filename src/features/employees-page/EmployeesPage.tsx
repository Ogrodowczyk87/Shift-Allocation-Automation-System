import { useState } from 'react'
import { AddEmployee } from './AddEmployee'
import type { Employee } from '../../models/Employee'

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])

  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee])
  }

  
  return (
     <div className="space-y-4 flex gap-4">
      <section className="rounded-lg border border-sky-200 bg-white p-6 text-slate-900 flex-1">
        <h1 className="text-xl font-semibold">Employees</h1>

        {employees.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">
            This page is ready for people management features.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2"
              >
                <img
                  src={employee.photoUrl || "https://via.placeholder.com/40?text=+"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <span className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">#{employee.id}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AddEmployee onAddEmployee={handleAddEmployee} />
    </div>
  )
}
