import { Card } from '../../../components/ui/Card'
import type { Employee } from '../../../models/Employee'
import type { Role } from '../../../models/Role'
import { ExportCsvButton } from './buttons/ExportCsvButton'
import { SavePlanButton } from './buttons/SavePlanButton'
import { ScheduleTable } from './ScheduleTable'

interface ScheduleItem {
  role: Role
  assignedEmployee?: Employee
}

const SCHEDULE_ROWS: ScheduleItem[] = [
  {
    role: { id: 'r1', name: 'Shift Lead' },
    assignedEmployee: { id: 'e1', firstName: 'Anna', lastName: 'Kowalska' },
  },
  {
    role: { id: 'r2', name: 'Machine Operator' },
    assignedEmployee: { id: 'e2', firstName: 'Jan', lastName: 'Nowak' },
  },
  {
    role: { id: 'r3', name: 'Quality Control' },
  },
  {
    role: { id: 'r4', name: 'Logistics' },
    assignedEmployee: { id: 'e4', firstName: 'Piotr', lastName: 'Wojcik' },
  },
]

export function GeneratedSchedulePanel() {
  const handleSave = () => {
    console.log('Save plan', SCHEDULE_ROWS)
  }

  const handleExportCsv = () => {
    const header = 'Role,Assigned Employee'
    const body = SCHEDULE_ROWS.map((row) => {
      const employee = row.assignedEmployee
        ? `${row.assignedEmployee.firstName} ${row.assignedEmployee.lastName}`
        : 'Unassigned'
      return `${row.role.name},${employee}`
    })

    const csv = [header, ...body].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'generated-schedule.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white">Generated Schedule</h2>

      <div className="mt-4">
        <ScheduleTable rows={SCHEDULE_ROWS} />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <SavePlanButton onClick={handleSave} />
        <ExportCsvButton onClick={handleExportCsv} />
      </div>
    </Card>
  )
}
