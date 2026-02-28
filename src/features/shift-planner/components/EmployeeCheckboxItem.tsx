import type { Employee } from '../../../models/Employee'

export interface EmployeeCheckboxItemProps {
  employee: Employee
  checked: boolean
  onToggle: (id: string) => void
}

export function EmployeeCheckboxItem({ employee, checked, onToggle }: EmployeeCheckboxItemProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 hover:border-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(employee.id)}
        className="h-4 w-4 accent-sky-400"
      />
      <span>{employee.firstName} {employee.lastName}</span>
    </label>
  )
}
