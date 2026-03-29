import type { Employee } from '../../../models/Employee'
import { LegendBar } from './LegendBar'
import { UnassignedEmployeesPanel } from './UnassignedEmployeesPanel'

type AllocationSetupTabProps = {
  unassignedEmployees: Employee[]
}

export function AllocationSetupTab({ unassignedEmployees }: AllocationSetupTabProps) {
  return (
    <div className="space-y-6">
      <UnassignedEmployeesPanel employees={unassignedEmployees} />
      <LegendBar />
    </div>
  )
}
