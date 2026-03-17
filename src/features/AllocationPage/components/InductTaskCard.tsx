import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../../utils/employeeAvatar'
import type { Employee, SpecialTask } from '../../../models/Employee'

const UNASSIGNED_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">' +
      '<rect width="36" height="36" rx="18" fill="#e2e8f0"/>' +
      '<path d="M18 10v16M10 18h16" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>'
  )

type InductTaskCardProps = {
  task: SpecialTask
  employeesById: Map<string, Employee>
}

export function InductTaskCard({ task, employeesById }: InductTaskCardProps) {
  const assignedEmployee = task.assignedEmployeeId
    ? employeesById.get(task.assignedEmployeeId)
    : undefined

  return (
    <article className="rounded-lg border border-slate-200 p-3">
      <p className="text-xs font-semibold text-sky-700">
        {task.group} / {task.name}
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-md bg-slate-50 p-2">
        <img
          src={
            assignedEmployee
              ? resolveEmployeePhotoUrl(assignedEmployee)
              : UNASSIGNED_AVATAR
          }
          alt={
            assignedEmployee
              ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
              : 'Unassigned task'
          }
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = assignedEmployee
              ? buildEmployeeAvatarUrl(assignedEmployee)
              : UNASSIGNED_AVATAR
          }}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {assignedEmployee
              ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
              : 'Unassigned'}
          </p>
          <p className="text-xs text-slate-500">
            {assignedEmployee ? `ID: ${assignedEmployee.id}` : 'ID: -'}
          </p>
        </div>
      </div>
    </article>
  )
}
