import { Card } from '../../../components/ui/Card'
import { DonutChart } from './DonutChart'

interface RotationComplianceCardProps {
  percentage: number
}

export function RotationComplianceCard({ percentage }: RotationComplianceCardProps) {
  return (
    <Card as="article">
      <h3 className="text-base font-semibold text-white">Rotation compliance</h3>
      <div className="mt-4 flex items-center gap-4">
        <DonutChart percentage={percentage} />
        <div>
          <p className="text-3xl font-bold text-sky-300">{percentage}%</p>
          <p className="text-sm text-slate-300">Roles compliant with rotation rules</p>
        </div>
      </div>
    </Card>
  )
}
