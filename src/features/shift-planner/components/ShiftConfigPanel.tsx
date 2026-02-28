import { useMemo, useState } from 'react'
import type { Employee } from '../../../models/Employee'
import { GenerateScheduleButton } from './GenerateScheduleButton'
import { PresentEmployeesList } from './PresentEmployeesList'
import { ShiftDateSelector } from './ShiftDateSelector'
import { ShiftTypeSelector, type ShiftType } from './ShiftTypeSelector'

const EMPLOYEES: Employee[] = [
  { id: 'e1', firstName: 'Anna', lastName: 'Kowalska' },
  { id: 'e2', firstName: 'Jan', lastName: 'Nowak' },
  { id: 'e3', firstName: 'Maria', lastName: 'Wiśniewska' },
  { id: 'e4', firstName: 'Piotr', lastName: 'Wójcik' },
]

function createDateOptions(): string[] {
  const today = new Date()

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    return date.toISOString().slice(0, 10)
  })
}

export function ShiftConfigPanel() {
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

  const handleGenerate = () => {
    console.log('Generate schedule', {
      selectedDate,
      shiftType,
      presentEmployees: selectedEmployeeIds,
    })
  }

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold text-white">Shift Configuration</h2>

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
          employees={EMPLOYEES}
          selectedIds={selectedEmployeeIds}
          onToggle={toggleEmployee}
        />
      </div>

      <div className="mt-4">
        <GenerateScheduleButton onClick={handleGenerate} />
      </div>
    </section>
  )
}
