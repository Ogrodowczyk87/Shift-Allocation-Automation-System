import { useEffect, useState } from 'react'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { AllocationPage } from './features/AllocationPage/AllocationPage'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import type { Employee } from './models/Employee'
import { DashboardPage } from './features/shift-planner/DashboardPage'
import { SettingsPage } from './features/setting-page/settings'
import { fetchEmployees, addEmployee as addEmployeeApi, archiveEmployee as archiveEmployeeApi } from './services/api/employees'

function App() {
  const [activePage, setActivePage] = useState<Page>('shift-planner')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

  useEffect(() => {
    void fetchEmployees()
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Failed to fetch employees', error))
      .finally(() => setIsLoadingEmployees(false))
  }, [])

  const handleAddEmployee = async (employee: Employee) => {
    const created = await addEmployeeApi(employee)
    setEmployees((prev) => [created, ...prev])
  }

  const handleArchiveEmployee = async (id: string) => {
    const archived = await archiveEmployeeApi(id)
    if (!archived) return

    setEmployees((prev) => prev.filter((employee) => employee.id !== id))
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

  if (isLoadingEmployees) {
    return <div className="p-6 text-sm text-slate-600">Loading employees...</div>
  }

  const pageContent = {
    'shift-planner': <DashboardPage employees={employees} />,
    people: (
      <EmployeesPage
        employees={employees}
        onAddEmployee={handleAddEmployee}
        onArchiveEmployee={handleArchiveEmployee}
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
