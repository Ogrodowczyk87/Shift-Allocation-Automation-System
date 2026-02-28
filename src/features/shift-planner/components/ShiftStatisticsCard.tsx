import { Card } from '../../../components/ui/Card'

interface ShiftStatisticsCardProps {
  totalEmployees: number
  openRoles: number
}

export function ShiftStatisticsCard({ totalEmployees, openRoles }: ShiftStatisticsCardProps) {
  return (
    <Card as="article">
      <h3 className="text-base font-semibold text-sky-900">Shift statistics</h3>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-md border border-sky-200 bg-sky-50 p-3">
          <dt className="text-xs uppercase tracking-wide text-sky-700">Total employees</dt>
          <dd className="mt-2 text-2xl font-bold text-sky-900">{totalEmployees}</dd>
        </div>
        <div className="rounded-md border border-sky-200 bg-sky-50 p-3">
          <dt className="text-xs uppercase tracking-wide text-sky-700">Open roles</dt>
          <dd className="mt-2 text-2xl font-bold text-blue-700">{openRoles}</dd>
        </div>
      </dl>
    </Card>
  )
}
