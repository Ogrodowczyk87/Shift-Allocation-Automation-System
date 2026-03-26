import { Checkbox } from '../../../components/ui/Checkbox'
import type { Employee } from '../../../models/Employee'

type SelectableEmployee = Pick<Employee, 'id' | 'firstName' | 'lastName'>

export interface EmployeeCheckboxItemProps {
  employee: SelectableEmployee
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
