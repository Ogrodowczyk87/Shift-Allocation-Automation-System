import { Checkbox } from '../../../components/ui/Checkbox'
import type { Employee } from '../../../models/Employee'

export interface EmployeeCheckboxItemProps {
  employee: Employee
  checked: boolean
  onToggle: (id: string) => void
}

export function EmployeeCheckboxItem({ employee, checked, onToggle }: EmployeeCheckboxItemProps) {
  return (
    <Checkbox
      label={`${employee.firstName} ${employee.lastName}`}
      checked={checked}
      onChange={() => onToggle(employee.id)}
    />
  )
}
