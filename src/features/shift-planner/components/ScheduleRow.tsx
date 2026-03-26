import { TableRow } from '../../../components/ui/TableRow'
import type { AssignedEmployee, ScheduleRole } from './schedule.types'

export interface ScheduleRowProps {
  role: ScheduleRole
  assignedEmployee?: AssignedEmployee
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
