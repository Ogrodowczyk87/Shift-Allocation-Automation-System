import { Card } from '../../../components/ui/Card'

interface ShiftStatisticsCardProps {
  totalEmployees: number
  openRoles: number
}

export function ShiftStatisticsCard({ totalEmployees, openRoles }: ShiftStatisticsCardProps) {
  return (
    <Card as="article">
      <h3 className="text-base font-semibold text-white">Shift statistics</h3>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Total employees</dt>
          <dd className="mt-2 text-2xl font-bold text-white">{totalEmployees}</dd>
        </div>
        <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Open roles</dt>
          <dd className="mt-2 text-2xl font-bold text-amber-300">{openRoles}</dd>
        </div>
      </dl>
    </Card>
  )
}
