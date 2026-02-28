import { GeneratedSchedulePanel } from './components/GeneratedSchedulePanel'
import { ShiftConfigPanel } from './components/ShiftConfigPanel'
import { StatsSection } from './components/StatsSection'

export function ShiftPlannerPage() {
  return (
    <section>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl">Shift Planner</h1>
        <p className="mt-2 text-slate-600">Configure shifts, review assignments, and monitor coverage.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <ShiftConfigPanel />
        <GeneratedSchedulePanel />
      </div>

      <div className="mt-4">
        <StatsSection />
      </div>
    </section>
  )
}
