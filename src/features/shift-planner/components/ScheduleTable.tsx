import { ScheduleRow } from './ScheduleRow'
import type { ScheduleItem } from './schedule.types'

interface ScheduleTableProps {
  rows: ScheduleItem[]
}

export function ScheduleTable({ rows }: ScheduleTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-sky-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-sky-50 text-sky-900">
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
