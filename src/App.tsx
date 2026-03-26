import { useState } from 'react'
import { AppLayout } from './app/layout/AppLayout'
import type { Page } from './app/layout/page.types'
import { AllocationPage } from './features/AllocationPage/AllocationPage'
import { EmployeesPage } from './features/employees-page/EmployeesPage'
import type { Employee, Training } from './models/Employee'
import { ShiftPlannerPage } from './features/shift-planner/ShiftPlannerPage'
import { SettingsPage } from './features/setting-page/settings'

const SEEDED_FIRST_NAMES = [
  'Adam', 'Bartek', 'Cezary', 'Damian', 'Emil', 'Filip', 'Grzegorz', 'Hubert', 'Igor', 'Jan',
  'Kacper', 'Lukasz', 'Marek', 'Norbert', 'Oskar', 'Pawel', 'Rafal', 'Sebastian', 'Tomasz', 'Wiktor',
  'Zbigniew', 'Andrzej', 'Borys', 'Cyprian', 'Dawid', 'Edward', 'Franciszek', 'Gustaw', 'Henryk', 'Ireneusz',
  'Jerzy', 'Konrad', 'Leon', 'Mikolaj', 'Nikodem', 'Olaf', 'Przemyslaw', 'Ryszard', 'Szymon', 'Teodor',
  'Wojciech', 'Zenon',
] as const

const SEEDED_LAST_NAMES = [
  'Adamski', 'Borowski', 'Czarnecki', 'Dudek', 'Eljasz', 'Frycz', 'Gorski', 'Herman', 'Ignaczak', 'Jablonski',
  'Kowal', 'Lisowski', 'Majchrzak', 'Nowicki', 'Orlowski', 'Pietrzak', 'Ratajczak', 'Sadowski', 'Tomczak', 'Urbanski',
  'Wasilewski', 'Zawadzki', 'Bielecki', 'Chojnacki', 'Domanski', 'Ekiert', 'Flis', 'Grabowski', 'Hajduk', 'Ilowski',
  'Jankowski', 'Krol', 'Lewandowski', 'Malinowski', 'Nawrocki', 'Olejniczak', 'Pawlowski', 'Rogowski', 'Sikora', 'Tracz',
  'Wlodarczyk', 'Zurawski',
] as const

const SEEDED_EMPLOYEES: Employee[] = Array.from({ length: 70 }, (_, index) => {
  const number = index + 1
  const id = `E${String(number).padStart(3, '0')}`
  const firstName = SEEDED_FIRST_NAMES[index % SEEDED_FIRST_NAMES.length]
  const lastName = SEEDED_LAST_NAMES[index % SEEDED_LAST_NAMES.length]
  const photoId = ((number - 1) % 70) + 1
  const trainings: Training[] =
    number % 3 === 0
      ? ['Stov', 'Induct', 'Divert', 'Problem Solving']
      : ['Stov', 'Induct', 'Divert']
  return {
    id,
    firstName,
    lastName,
    photoUrl: `https://i.pravatar.cc/150?img=${photoId}`,
    trainings,
    status: 'active',
    active:  false,
  }
})

function App() {
  const [activePage, setActivePage] = useState<Page>('shift-planner')
  const [employees, setEmployees] = useState<Employee[]>(SEEDED_EMPLOYEES)

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
    'shift-planner': <ShiftPlannerPage employees={employees} />,
    people: (
      <EmployeesPage
        employees={employees}
        onAddEmployee={handleAddEmployee}
        onAddEmployeesToPool={handleAddEmployeesToPool}
      />
    ),
    history: <AllocationPage employees={employees} />,
    settings: <SettingsPage />,
  } as const

  return (
    <AppLayout activePage={activePage} onSelectPage={setActivePage}>
      {pageContent[activePage]}
    </AppLayout>
  )
}

export default App
