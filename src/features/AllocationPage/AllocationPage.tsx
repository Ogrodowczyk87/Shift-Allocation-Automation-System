import { useMemo, useState } from 'react'
import type { Employee, Slot, SpecialTask } from '../../models/Employee'
// import { ActiveEmployeesPanel } from './components/ActiveEmployeesPanel'
import { AllocationBoard } from './components/AllocationBoard'
import { AllocationToolbar } from './components/AllocationToolbar'
import { LegendBar } from './components/LegendBar'
import { UnassignedEmployeesPanel } from './components/UnassignedEmployeesPanel'

type AllocationPageProps = {
  employees: Employee[]
}

const createSlotsForLocationPairs = (
  area: Slot['area'],
  startNumber: number,
  endNumber: number,
): Slot[] => {
  const slots: Slot[] = []

  for (let current = startNumber; current <= endNumber; current += 2) {
    const next = current + 1
    slots.push({
      id: `${area}-${current}-${next}`,
      area,
      aisle: current,
      location: next,
      active: false,
      assignetEmployeeId: null,
    })
  }

  return slots
}


const DEFAULT_SLOTS: Slot[] = [
  ...createSlotsForLocationPairs('A', 29, 52),
  ...createSlotsForLocationPairs('A', 1, 28),
  ...createSlotsForLocationPairs('B', 1, 26),
  ...createSlotsForLocationPairs('B', 27, 52),
]

const DEFAULT_SPECIAL_TASKS: SpecialTask[] = [
  { id: 'asl1-loader', name: 'loader', group: 'ASL1', active: false, assignedEmployeeId: null },
  { id: 'asl1-aligner', name: 'aligner', group: 'ASL1', active: false, assignedEmployeeId: null },
  { id: 'asl1-pusher', name: 'pusher', group: 'ASL1', active: false, assignedEmployeeId: null },

  { id: 'asl2-loader', name: 'loader', group: 'ASL2', active: false, assignedEmployeeId: null },
  { id: 'asl2-aligner', name: 'aligner', group: 'ASL2', active: false, assignedEmployeeId: null },
  { id: 'asl2-pusher', name: 'pusher', group: 'ASL2', active: false, assignedEmployeeId: null },

  { id: 'ws-induct1', name: 'water spider induct1', group: 'WaterSpider', active: false, assignedEmployeeId: null },
  { id: 'ws-asl', name: 'water spider ASL', group: 'WaterSpider', active: false, assignedEmployeeId: null },
  { id: 'ws-induct45', name: 'water spider induct 4-5', group: 'WaterSpider', active: false, assignedEmployeeId: null },
  { id: 'ws-induct46', name: 'water spider induct 6-7', group: 'WaterSpider', active: false, assignedEmployeeId: null },

  { id: 'problem-solve', name: 'Problem Solving', group: 'Problem Solving', active: false, assignedEmployeeId: null },
  { id: 'divert-a', name: 'Divert A', group: 'Divert', active: false, assignedEmployeeId: null },
  { id: 'divert-b', name: 'Divert B', group: 'Divert', active: false, assignedEmployeeId: null },
  { id: 'oversizes', name: 'Oversizes', group: 'Support', active: false, assignedEmployeeId: null },
  { id: 'trainer', name: 'Trainer', group: 'Support', active: false, assignedEmployeeId: null },

  { id: 'induct1-loader', name: 'loader', group: 'Induct 1', active: false, assignedEmployeeId: null },
  { id: 'induct1-label', name: 'label', group: 'Induct 1', active: false, assignedEmployeeId: null },
  { id: 'induct1-pusher', name: 'pusher', group: 'Induct 1', active: false, assignedEmployeeId: null },

  { id: 'induct45-loader', name: 'loader', group: 'Induct 4-5', active: false, assignedEmployeeId: null },
  { id: 'induct45-label', name: 'label', group: 'Induct 4-5', active: false, assignedEmployeeId: null },
  { id: 'induct45-pusher', name: 'pusher', group: 'Induct 4-5', active: false, assignedEmployeeId: null },

  { id: 'induct67-loader', name: 'loader', group: 'Induct 6-7', active: false, assignedEmployeeId: null },
  { id: 'induct67-label', name: 'label', group: 'Induct 6-7', active: false, assignedEmployeeId: null },
  { id: 'induct67-pusher', name: 'pusher', group: 'Induct 6-7', active: false, assignedEmployeeId: null },
]


export function AllocationPage({ employees }: AllocationPageProps) {
  const [slots, setSlots] = useState<Slot[]>(DEFAULT_SLOTS)
  const [specialTasks, setSpecialTasks] = useState<SpecialTask[]>(DEFAULT_SPECIAL_TASKS)

  const activeEmployees = useMemo(
    () => employees.filter((employee) => employee.active && employee.status === 'active'),
    [employees]
  )

  const handleToggleSlot = (slotId: string) => {
    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              active: !slot.active,
              assignetEmployeeId: slot.active ? null : slot.assignetEmployeeId,
            }
          : slot
      )
    )
  }

  const employeesById = useMemo(
    () =>
      new Map(
        employees.map((employee) => [employee.id, employee] as const)
      ),
    [employees]
  )

  const unassignedEmployees = useMemo(() => {
    const assignedIds = new Set(
      [
        ...slots.map((slot) => slot.assignetEmployeeId),
        ...specialTasks.map((task) => task.assignedEmployeeId),
      ].filter((employeeId): employeeId is string => Boolean(employeeId))
    )

    return activeEmployees.filter((employee) => !assignedIds.has(employee.id))
  }, [activeEmployees, slots, specialTasks])

  // const handleAllocate = () => {
  //   setSlots((currentSlots) =>
  //     currentSlots.map((slot, index) => ({
  //       ...slot,
  //       assignetEmployeeId: activeEmployees[index]?.id ?? null,
  //     }))
  //   )
  // }

  const handleAllocate = () => {
    const assignedIds = new Set(
      [
        ...slots.map((slot) => slot.assignetEmployeeId),
        ...specialTasks.map((task) => task.assignedEmployeeId),
      ].filter((employeeId): employeeId is string => Boolean(employeeId))
    )

    const remainingEmployees = activeEmployees.filter(
      (employee) => !assignedIds.has(employee.id)
    )

    let employeeIndex = 0
    const nextSpecialTasks = specialTasks.map((task) => {
      if (!task.active || task.assignedEmployeeId) {
        return task
      }

      const employee = remainingEmployees[employeeIndex]
      employeeIndex += 1

      return {
        ...task,
        assignedEmployeeId: employee?.id ?? null,
      }
    })

    const nextSlots = slots.map((slot) => {
      if (!slot.active || slot.assignetEmployeeId) {
        return slot
      }

      const employee = remainingEmployees[employeeIndex]
      employeeIndex += 1

      return {
        ...slot,
        assignetEmployeeId: employee?.id ?? null,
      }
    })

    setSpecialTasks(nextSpecialTasks)
    setSlots(nextSlots)
  }

  const handleToggleSpecialTask = (taskId: string) => {
    setSpecialTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              active: !task.active,
              assignedEmployeeId: task.active ? null : task.assignedEmployeeId,
            }
          : task
      )
    )
  }

  const handleSetSlotsActive = (slotIds: string[], active: boolean) => {
    const slotIdsSet = new Set(slotIds)

    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slotIdsSet.has(slot.id)
          ? {
              ...slot,
              active,
              assignetEmployeeId: active ? slot.assignetEmployeeId : null,
            }
          : slot
      )
    )
  }

  const handleSetSpecialTasksActive = (taskIds: string[], active: boolean) => {
    const taskIdsSet = new Set(taskIds)

    setSpecialTasks((currentTasks) =>
      currentTasks.map((task) =>
        taskIdsSet.has(task.id)
          ? {
              ...task,
              active,
              assignedEmployeeId: active ? task.assignedEmployeeId : null,
            }
          : task
      )
    )
  }

  const handleExportCsv = () => {
    const header = 'Type,Location/Task,Assigned Employee'
    const rows: string[] = []

    // Add slots
    slots.forEach((slot) => {
      if (slot.assignetEmployeeId) {
        const employee = employeesById.get(slot.assignetEmployeeId)
        const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown'
        rows.push(`Slot,${slot.area} ${slot.aisle}-${slot.location},${employeeName}`)
      }
    })

    // Add special tasks
    specialTasks.forEach((task) => {
      if (task.assignedEmployeeId) {
        const employee = employeesById.get(task.assignedEmployeeId)
        const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown'
        rows.push(`Special Task,${task.group} - ${task.name},${employeeName}`)
      }
    })

    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'allocation-export.csv'
    link.click()

    URL.revokeObjectURL(url)
  }


//   const activeSlots = useMemo(
//   () => slots.filter((slot) => slot.active),
//   [slots]
// )


  return (
    <div className="p-6 space-y-6">
  <AllocationToolbar
    poolCount={unassignedEmployees.length}
    slots={slots}
    specialTasks={specialTasks}
    onToggleSlot={handleToggleSlot}
    onToggleSpecialTask={handleToggleSpecialTask}
    onSetSlotsActive={handleSetSlotsActive}
    onSetSpecialTasksActive={handleSetSpecialTasksActive}
    onAllocate={handleAllocate}
    onExportCsv={handleExportCsv}
  />         
 <UnassignedEmployeesPanel employees={unassignedEmployees} />
          <AllocationBoard slots={slots} specialTasks={specialTasks} employeesById={employeesById} />
          <LegendBar />
    </div>
  )
}
