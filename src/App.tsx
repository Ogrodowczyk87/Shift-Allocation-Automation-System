import { useState } from 'react'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { AllocationPage } from './features/AllocationPage/AllocationPage'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import type { Employee } from './models/Employee'
import { ReportsPage } from './features/reports-page/ReportsPage'
import { ShiftPlannerPage } from './features/shift-planner/ShiftPlannerPage'
import { SettingsPage } from './features/setting-page/settings'

function App() {
  const [activePage, setActivePage] = useState<Page>('shift-planner')
  const [employees, setEmployees] = useState<Employee[]>([])

  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee])
  }

  const handleAddEmployeesToPool = (ids: string[]) => {
    const idsSet = new Set(ids)
    setEmployees((prev) =>
      prev.map((employee) =>
        idsSet.has(employee.id) ? { ...employee, active: true } : employee
      )
    )
  }

  const pageContent = {
    'shift-planner': <ShiftPlannerPage />,
    people: (
      <EmployeesPage
        employees={employees}
        onAddEmployee={handleAddEmployee}
        onAddEmployeesToPool={handleAddEmployeesToPool}
      />
    ),
    history: <AllocationPage employees={employees} />,
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
