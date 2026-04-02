import { useMemo, useState } from 'react'
import { Card } from '../../../components/ui/Card'
import type { Employee } from '../../../models/Employee'
import { PresentEmployeesList } from './PresentEmployeesList'
import { ShiftDateSelector } from './ShiftDateSelector'
import { ShiftTypeSelector, type ShiftType } from './ShiftTypeSelector'

type ShiftPlannerEmployee = Pick<Employee, 'id' | 'firstName' | 'lastName'>

<<<<<<< ours
const EMPLOYEES: ShiftPlannerEmployee[] = [
  { id: 'e1', firstName: 'Anna', lastName: 'Kowalska' },
  { id: 'e2', firstName: 'Jan', lastName: 'Nowak' },
  { id: 'e3', firstName: 'Maria', lastName: 'Wisniewska' },
  { id: 'e4', firstName: 'Piotr', lastName: 'Wojcik' },
]
=======
type ShiftConfigPanelProps = {
  employees: ShiftPlannerEmployee[]
}
>>>>>>> theirs

function createDateOptions(): string[] {
  const today = new Date()

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    return date.toISOString().slice(0, 10)
  })
}

<<<<<<< ours
export function ShiftConfigPanel() {
=======
export function ShiftConfigPanel({ employees }: ShiftConfigPanelProps) {
>>>>>>> theirs
  const dateOptions = useMemo(() => createDateOptions(), [])
  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0] ?? '')
  const [shiftType, setShiftType] = useState<ShiftType>('Day')
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([])

  const toggleEmployee = (id: string) => {
    setSelectedEmployeeIds((current) =>
      current.includes(id)
        ? current.filter((employeeId) => employeeId !== id)
        : [...current, id],
    )
  }

  

  return (
    <Card>
      <h2 className="text-lg font-semibold text-sky-900">Shift Configuration</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ShiftDateSelector
          value={selectedDate}
          options={dateOptions}
          onChange={setSelectedDate}
        />
        <ShiftTypeSelector value={shiftType} onChange={setShiftType} />
      </div>

      <div className="mt-4">
        <PresentEmployeesList
<<<<<<< ours
          employees={EMPLOYEES}
=======
          employees={employees}
>>>>>>> theirs
          selectedIds={selectedEmployeeIds}
          onToggle={toggleEmployee}
        />
      </div>

      
    </Card>
  )
}
