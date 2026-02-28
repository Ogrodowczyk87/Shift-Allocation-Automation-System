import type { Employee } from '../../../models/Employee'
import { EmployeeCheckboxItem } from './EmployeeCheckboxItem'

interface PresentEmployeesListProps {
  employees: Employee[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function PresentEmployeesList({ employees, selectedIds, onToggle }: PresentEmployeesListProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-slate-200">Present employees</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {employees.map((employee) => (
          <EmployeeCheckboxItem
            key={employee.id}
            employee={employee}
            checked={selectedIds.includes(employee.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}
