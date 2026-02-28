import { Navbar } from './components/ui/Navbar'
import { ShiftConfigPanel } from './features/shift-planner/components/ShiftConfigPanel'
import { GeneratedSchedulePanel } from './features/shift-planner/components/GeneratedSchedulePanel'
import { StatsSection } from './features/shift-planner/components/StatsSection'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <ShiftConfigPanel />
          <GeneratedSchedulePanel />
        </div>

        <div className="mt-4">
          <StatsSection />
        </div>
      </section>
    </main>
  )
}

export default App
