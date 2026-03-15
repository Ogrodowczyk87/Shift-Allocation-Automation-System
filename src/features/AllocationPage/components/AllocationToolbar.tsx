import type { Slot, SpecialTask } from '../../../models/Employee'

type AllocationToolbarProps = {
  poolCount: number
  slots: Slot[]
  specialTasks: SpecialTask[]
  onAllocate: () => void
  onToggleSlot: (slotId: string) => void
  onToggleSpecialTask: (taskId: string) => void
  onSetSlotsActive: (slotIds: string[], active: boolean) => void
  onSetSpecialTasksActive: (taskIds: string[], active: boolean) => void
}

export function AllocationToolbar({
  poolCount,
  slots,
  specialTasks,
  onAllocate,
  onToggleSlot,
  onToggleSpecialTask,
  onSetSlotsActive,
  onSetSpecialTasksActive,
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
    <label
      key={slot.id}
      className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm transition ${
        slot.active
          ? 'border-sky-200 bg-sky-50/80 text-sky-900'
          : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={slot.active}
          onChange={() => onToggleSlot(slot.id)}
          className="h-4 w-4 rounded border-slate-300 accent-sky-600"
        />
        <span>
          {slot.area} {slot.aisle}-{slot.location}
        </span>
      </div>
      <span
        className={`rounded-full px-2 py-1 text-[11px] font-medium ${
          slot.active ? 'bg-white text-sky-700' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {slot.active ? 'On' : 'Off'}
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

  const allSpecialTasksChecked =
    specialTasks.length > 0 && specialTasks.every((task) => task.active)

  const activeSlotsCount = slots.filter((slot) => slot.active).length
  const activeSpecialTasksCount = specialTasks.filter((task) => task.active).length

  const renderSlotGroup = (title: string, groupSlots: Slot[]) => {
    const allChecked = groupSlots.length > 0 && groupSlots.every((slot) => slot.active)

    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {groupSlots.filter((slot) => slot.active).length}/{groupSlots.length} selected
            </p>
          </div>
          <label className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium text-sky-800">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={(event) =>
                onSetSlotsActive(
                  groupSlots.map((slot) => slot.id),
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-slate-300 accent-sky-600"
            />
            <span>All</span>
          </label>
        </div>
        <div className="space-y-2">{groupSlots.map(renderSlotCheckbox)}</div>
      </div>
    )
  }


  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Allocation</p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">Today&apos;s assignment setup</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm text-slate-600">
              Available in pool: <span className="font-semibold text-slate-900">{poolCount}</span>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
              Active slots: <span className="font-semibold text-slate-900">{activeSlotsCount}</span>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
              Special roles: <span className="font-semibold text-slate-900">{activeSpecialTasksCount}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onAllocate}
            disabled={poolCount === 0}
            className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Allocate
          </button>
        </div>
      </div>

      <div className="space-y-6 p-5">
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Active slots for today</h2>
              <p className="mt-1 text-sm text-slate-500">Select the location blocks that should receive allocation.</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {renderSlotGroup('Aisle A: 29-52', aLeft)}
            {renderSlotGroup('Aisle A: 1-28', aRight)}
            {renderSlotGroup('Aisle B: 1-26', bLeft)}
            {renderSlotGroup('Aisle B: 27-52', bRight)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Special roles for today</h2>
              <p className="mt-1 text-sm text-slate-500">Use one switch to activate all support roles, or choose them individually.</p>
            </div>
            <label className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-medium text-sky-800 shadow-sm">
              <input
                type="checkbox"
                checked={allSpecialTasksChecked}
                onChange={(event) =>
                  onSetSpecialTasksActive(
                    specialTasks.map((task) => task.id),
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-slate-300 accent-sky-600"
              />
              <span>Select all</span>
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {Object.entries(groupedSpecialTasks).map(([groupName, tasks]) => (
              <div key={groupName} className="rounded-xl border border-white bg-white p-3 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {groupName}
                  </h3>
                  <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
                    {tasks.filter((task) => task.active).length}/{tasks.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {tasks.map((task) => (
                    <label key={task.id} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/60">
                      <input
                        type="checkbox"
                        checked={task.active}
                        onChange={() => onToggleSpecialTask(task.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                      />
                      <span>{task.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
