import type { Employee, SpecialTask } from '../../../models/Employee'
import { InductTaskCard } from './InductTaskCard'

type SpecialInductTskProps = {
  task: SpecialTask[]
  employeesById: Map<string, Employee>
  onToggleTask: (taskId: string) => void
}

export function InductTaskToolbar({ task, employeesById, onToggleTask }: SpecialInductTskProps) {
  const inductTasks = task.filter((singleTask) => singleTask.group.startsWith('Induct '))

  const groupedInductTasks = {
    'Induct 1': inductTasks.filter((singleTask) => singleTask.group === 'Induct 1'),
    'Induct 4-5': inductTasks.filter((singleTask) => singleTask.group === 'Induct 4-5'),
    'Induct 6-7': inductTasks.filter((singleTask) => singleTask.group === 'Induct 6-7'),
  }

  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-700">Induct Tasks</h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {Object.entries(groupedInductTasks).map(([groupName, groupTasks]) => (
          <div key={groupName} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{groupName}</h3>
                <p className="text-xs text-slate-500">
                  {groupTasks.filter((singleTask) => singleTask.active).length}/{groupTasks.length} selected
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {groupTasks.map((singleTask) => (
                <div key={singleTask.id} className="space-y-2">
                  <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/60">
                    <input
                      type="checkbox"
                      checked={singleTask.active}
                      onChange={() => onToggleTask(singleTask.id)}
                      className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                    />
                    <span className="font-medium capitalize">{singleTask.name}</span>
                  </label>

                  <InductTaskCard
                    task={singleTask}
                    employeesById={employeesById}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
