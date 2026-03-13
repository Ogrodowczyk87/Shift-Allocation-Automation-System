import type { Employee, SpecialTask } from '../../../models/Employee'
import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../../utils/employeeAvatar'

type SpecialTasksBoardProps = {
  tasks: SpecialTask[]
  employeesById: Map<string, Employee>
}

const UNASSIGNED_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">' +
      '<rect width="36" height="36" rx="18" fill="#e2e8f0"/>' +
      '<path d="M18 10v16M10 18h16" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>'
  )

export function SpecialTasksBoard({ tasks, employeesById }: SpecialTasksBoardProps) {
  const activeTasks = tasks.filter((task) => task.active)

  const groupedTasks = {
    ASL1: activeTasks.filter((task) => task.group === 'ASL1'),
    ASL2: activeTasks.filter((task) => task.group === 'ASL2'),
    WaterSpider: activeTasks.filter((task) => task.group === 'WaterSpider'),
    Divert: activeTasks.filter((task) => task.group === 'Divert'),
    'Problem Solving': activeTasks.filter((task) => task.group === 'Problem Solving'),
    Support: activeTasks.filter((task) => task.group === 'Support'),
  }

  const renderTask = (task: SpecialTask) => {
    const assignedEmployee = task.assignedEmployeeId
      ? employeesById.get(task.assignedEmployeeId)
      : undefined

    return (
      <article key={task.id} className="rounded-lg border border-slate-200 p-3">
        <p className="text-xs font-semibold text-sky-700">
          {task.group} / {task.name}
        </p>
        <div className="mt-3 flex items-center gap-3 rounded-md bg-slate-50 p-2">
          <img
            src={assignedEmployee ? resolveEmployeePhotoUrl(assignedEmployee) : UNASSIGNED_AVATAR}
            alt={assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : 'Unassigned task'}
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

  return (
    <section className="rounded-xl border border-sky-200 bg-white p-4">
      <h2 className="text-base font-semibold">Special Roles</h2>

      {activeTasks.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No special roles selected for today.</p>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-4">
          {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
            <div key={groupName}>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">{groupName}</h3>
              <div className="space-y-3">
                {groupTasks.length === 0 ? (
                  <p className="text-sm text-slate-400">No active roles</p>
                ) : (
                  groupTasks.map(renderTask)
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
