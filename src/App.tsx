import { useState } from 'react'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import { HistoryPage } from './features/history-page/HistoryPage'
import { ReportsPage } from './features/reports-page/ReportsPage'
import { ShiftPlannerPage } from './features/shift-planner/ShiftPlannerPage'
import { SettingsPage } from './features/setting-page/settings'

function App() {
  const [activePage, setActivePage] = useState<Page>('shift-planner')
  const pageContent = {
    'shift-planner': <ShiftPlannerPage />,
    people: <EmployeesPage />,
    history: <HistoryPage />,
    reports: <ReportsPage />,
    settings: <SettingsPage />,
  } as const

  return (
    <AppLayout activePage={activePage} onSelectPage={setActivePage}>
      {pageContent[activePage]}
    </AppLayout>
  )
}

export default App
