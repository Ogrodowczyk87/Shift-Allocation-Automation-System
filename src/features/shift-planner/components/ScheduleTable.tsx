import type { Employee } from '../../../models/Employee'
import type { Role } from '../../../models/Role'
import { ScheduleRow } from './ScheduleRow'

interface ScheduleItem {
  role: Role
  assignedEmployee?: Employee
}

interface ScheduleTableProps {
  rows: ScheduleItem[]
}

export function ScheduleTable({ rows }: ScheduleTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-950/70 text-slate-300">
          <tr>
            <th className="px-3 py-2 font-medium">Role</th>
            <th className="px-3 py-2 font-medium">Assigned employee</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <ScheduleRow
              key={row.role.id}
              role={row.role}
              assignedEmployee={row.assignedEmployee}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
