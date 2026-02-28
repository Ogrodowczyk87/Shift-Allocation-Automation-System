import { TableRow } from '../../../components/ui/TableRow'
import type { Employee } from '../../../models/Employee'
import type { Role } from '../../../models/Role'

export interface ScheduleRowProps {
  role: Role
  assignedEmployee?: Employee
}

export function ScheduleRow({ role, assignedEmployee }: ScheduleRowProps) {
  return (
    <TableRow>
      <td className="px-3 py-2 text-slate-800">{role.name}</td>
      <td className="px-3 py-2 text-slate-600">
        {assignedEmployee
          ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
          : 'Unassigned'}
      </td>
    </TableRow>
  )
}
