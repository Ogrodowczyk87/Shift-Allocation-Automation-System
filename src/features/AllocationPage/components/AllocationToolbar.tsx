import type { Slot, SpecialTask } from '../../../models/Employee'

type AllocationToolbarProps = {
  poolCount: number
  slots: Slot[]
  specialTasks: SpecialTask[]
  onAllocate: () => void
  onToggleSlot: (slotId: string) => void
  onToggleSpecialTask: (taskId: string) => void
}

export function AllocationToolbar({
  poolCount,
  slots,
  specialTasks,
  onAllocate,
  onToggleSlot,
  onToggleSpecialTask,
}: AllocationToolbarProps) {
  const aLeft = slots.filter(
    (slot) => slot.area === 'A' && slot.aisle >= 29 && slot.aisle <= 52
  )

  const aRight = slots.filter(
    (slot) => slot.area === 'A' && slot.aisle >= 1 && slot.aisle <= 28
  )

  const bLeft = slots.filter(
    (slot) => slot.area === 'B' && slot.aisle >= 1 && slot.aisle <= 26
  )

  const bRight = slots.filter(
    (slot) => slot.area === 'B' && slot.aisle >= 27 && slot.aisle <= 52
  )
 
  const renderSlotCheckbox = (slot: Slot) => (
    <label key={slot.id} className="flex items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={slot.active}
        onChange={() => onToggleSlot(slot.id)}
        className="h-4 w-4 rounded border-slate-300"
      />
      <span>
        {slot.area} {slot.aisle}-{slot.location}
      </span>
    </label>
  )

  const groupedSpecialTasks = {
    ASL1: specialTasks.filter((task) => task.group === 'ASL1'),
    ASL2: specialTasks.filter((task) => task.group === 'ASL2'),
    WaterSpider: specialTasks.filter((task) => task.group === 'WaterSpider'),
    Divert: specialTasks.filter((task) => task.group === 'Divert'),
    'Problem Solving': specialTasks.filter((task) => task.group === 'Problem Solving'),
    Support: specialTasks.filter((task) => task.group === 'Support'),
  }


  return (
    <section className="rounded-xl border border-sky-200 bg-white p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Allocation</h1>
          <p className="text-sm text-slate-600">
            Employees in pool: <span className="font-semibold text-slate-900">{poolCount}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onAllocate}
          disabled={poolCount === 0}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Allocate
        </button>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Active slots for today</h2>

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Alejka A: 29-52
            </h3>
            {aLeft.map(renderSlotCheckbox)}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Alejka A: 1-28
            </h3>
            {aRight.map(renderSlotCheckbox)}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Alejka B: 1-26
            </h3>
            {bLeft.map(renderSlotCheckbox)}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Alejka B: 27-52
            </h3>
            {bRight.map(renderSlotCheckbox)}
          </div>
        </div>
     
        
      </div>

     <div>
  <h2 className="mb-3 text-sm font-semibold text-slate-800">Special roles for today</h2>

  <div className="grid gap-4 lg:grid-cols-4">
    {Object.entries(groupedSpecialTasks).map(([groupName, tasks]) => (
      <div key={groupName} className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {groupName}
        </h3>

        {tasks.map((task) => (
          <label key={task.id} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={task.active}
              onChange={() => onToggleSpecialTask(task.id)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span>{task.name}</span>
          </label>
        ))}
      </div>
    ))}
  </div>
</div>

      
    </section>
  )
}
