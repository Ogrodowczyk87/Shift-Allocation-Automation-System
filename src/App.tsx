import { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { AllocationPage } from './features/AllocationPage/AllocationPage'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import type { Employee } from './models/Employee'
import { DashboardPage } from './features/shift-planner/DashboardPage'
import { SettingsPage } from './features/setting-page/settings'
import {
  fetchEmployees,
  addEmployee as addEmployeeApi,
  archiveEmployee as archiveEmployeeApi,
} from './services/api/employees'
import { setAccessToken } from './services/tokenStore'

function App() {
  const auth = useAuth()
  const [activePage, setActivePage] = useState<Page>('shift-planner')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI
const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN

    setAccessToken(null)
    void auth.removeUser()
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
  }

  useEffect(() => {
    setAccessToken(auth.user?.access_token ?? null)
  }, [auth.user])

  useEffect(() => {
    if (!auth.isAuthenticated) return

    setIsLoadingEmployees(true)

    void fetchEmployees()
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Failed to fetch employees', error))
      .finally(() => setIsLoadingEmployees(false))
  }, [auth.isAuthenticated])

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

  if (auth.isLoading) {
    return <div className="p-6 text-sm text-slate-600">Loading authentication...</div>
  }

  if (!auth.isAuthenticated) {
    if (auth.error) {
      return (
        <div className="p-6 text-sm text-rose-600">
          Authentication error: {auth.error.message}
        </div>
      )
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Shift Allocation System</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access the application.
          </p>
          <button
            onClick={() => void auth.signinRedirect()}
            className="mt-6 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Sign in
          </button>
        </div>
      </div>
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
    <div className="min-h-screen bg-slate-50">
      <div className="flex justify-end border-b border-slate-200 bg-white px-6 py-3">
        <button
          onClick={signOutRedirect}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>

      <AppLayout activePage={activePage} onSelectPage={setActivePage}>
        {pageContent[activePage]}
      </AppLayout>
    </div>
  )
}

export default App
