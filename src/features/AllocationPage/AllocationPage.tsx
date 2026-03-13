import { useMemo, useState } from 'react'
import type { Employee, Slot } from '../../models/Employee'
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

export function AllocationPage({ employees }: AllocationPageProps) {
  const [slots, setSlots] = useState<Slot[]>(DEFAULT_SLOTS)
  
  const activeEmployees = useMemo(
    () => employees.filter((employee) => employee.active && employee.status === 'active'),
    [employees]
  )
  
   const handleToggleSlot = (slotId: string) => {
    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.id === slotId ? { ...slot, active: !slot.active } : slot
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
      slots
        .map((slot) => slot.assignetEmployeeId)
        .filter((employeeId): employeeId is string => Boolean(employeeId))
    )
    return activeEmployees.filter((employee) => !assignedIds.has(employee.id))

  }, [activeEmployees, slots])

  // const handleAllocate = () => {
  //   setSlots((currentSlots) =>
  //     currentSlots.map((slot, index) => ({
  //       ...slot,
  //       assignetEmployeeId: activeEmployees[index]?.id ?? null,
  //     }))
  //   )
  // }

const handleAllocate = () => {
  setSlots((currentSlots) => {
    const assignedIds = new Set(
      currentSlots
        .map((slot) => slot.assignetEmployeeId)
        .filter((employeeId): employeeId is string => Boolean(employeeId))
    )

    const remainingEmployees = activeEmployees.filter(
      (employee) => !assignedIds.has(employee.id)
    )

    let employeeIndex = 0

    return currentSlots.map((slot) => {
      if (!slot.active) {
        return slot
      }

      if (slot.assignetEmployeeId) {
        return slot
      }

      const employee = remainingEmployees[employeeIndex]
      employeeIndex += 1

      return {
        ...slot,
        assignetEmployeeId: employee?.id ?? null,
      }
    })
  })
}



//   const activeSlots = useMemo(
//   () => slots.filter((slot) => slot.active),
//   [slots]
// )


  return (
    <div className="p-6 space-y-6">
          <AllocationToolbar poolCount={activeEmployees.length} slots={slots} onToggleSlot={handleToggleSlot} onAllocate={handleAllocate} />
          <UnassignedEmployeesPanel employees={unassignedEmployees} />
          <AllocationBoard slots={slots} employeesById={employeesById} />
          <LegendBar />
    </div>
  )
}
