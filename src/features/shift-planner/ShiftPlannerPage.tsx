import { GeneratedSchedulePanel } from './components/GeneratedSchedulePanel'
import { ShiftConfigPanel } from './components/ShiftConfigPanel'
import { StatsSection } from './components/StatsSection'

export function ShiftPlannerPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
      <ShiftConfigPanel />
      <GeneratedSchedulePanel />
      <StatsSection />
    </section>
  )
}
