import { useState } from 'react'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { AllocationPage } from './features/AllocationPage/AllocationPage'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import type { Employee} from './models/Employee'
import { DashboardPage } from './features/shift-planner/DashboardPage'
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
    prev.map((employee) => ({
      ...employee,
      active: employee.active || idsSet.has(employee.id),
    }))
  )
}

  const pageContent = {
    'shift-planner': <DashboardPage employees={employees} />,
    people: (
      <EmployeesPage
        employees={employees}
        onAddEmployee={handleAddEmployee}
        onAddEmployeesToPool={handleAddEmployeesToPool}
      />
    ),
    allocation: <AllocationPage employees={employees} />,
    settings: <SettingsPage />,
  } as const

  return (
    <AppLayout activePage={activePage} onSelectPage={setActivePage}>
      {pageContent[activePage]}
    </AppLayout>
  )
}

export default App
