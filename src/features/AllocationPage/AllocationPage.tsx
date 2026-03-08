import { useMemo, useState } from 'react'
import type { Employee, Slot } from '../../models/Employee'
import { ActiveEmployeesPanel } from './components/ActiveEmployeesPanel'
import { AllocationBoard } from './components/AllocationBoard'
import { AllocationToolbar } from './components/AllocationToolbar'
import { LegendBar } from './components/LegendBar'

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
      assignetEmployeeId: null,
    })
  }

  return slots
}

const DEFAULT_SLOTS: Slot[] = [
  ...createSlotsForLocationPairs('A', 1, 54),
  ...createSlotsForLocationPairs('B', 27, 52),
]

export function AllocationPage({ employees }: AllocationPageProps) {
  const [slots, setSlots] = useState<Slot[]>(DEFAULT_SLOTS)

  const activeEmployees = useMemo(
    () => employees.filter((employee) => employee.active && employee.status === 'active'),
    [employees]
  )

  const employeesById = useMemo(
    () =>
      new Map(
        employees.map((employee) => [employee.id, employee] as const)
      ),
    [employees]
  )

  const handleAllocate = () => {
    setSlots((currentSlots) =>
      currentSlots.map((slot, index) => ({
        ...slot,
        assignetEmployeeId: activeEmployees[index]?.id ?? null,
      }))
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AllocationToolbar poolCount={activeEmployees.length} onAllocate={handleAllocate} />

      <div className="grid grid-cols-3 gap-6">
        <ActiveEmployeesPanel employees={activeEmployees} />

        <div className="col-span-2">
          <AllocationBoard slots={slots} employeesById={employeesById} />
        </div>
      </div>

      <LegendBar />
    </div>
  )
}
