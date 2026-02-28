import { RotationComplianceCard } from './RotationComplianceCard'
import { ShiftStatisticsCard } from './ShiftStatisticsCard'

export function StatsSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <RotationComplianceCard percentage={78} />
      <ShiftStatisticsCard totalEmployees={12} openRoles={2} />
    </section>
  )
}
