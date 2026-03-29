import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import appPreviewImage from '../../assets/app.png'
import type { Employee, Slot, SpecialTask } from '../../models/Employee'
import { TRAININGS_OPTIONS } from '../../models/Employee'
import { STORAGE_KEYS } from '../../services/storage/keys'
import { loadFromLocalStorage } from '../../services/storage/localStorage'

type DashboardPageProps = {
  employees: Employee[]
}

type AllocationSnapshot = {
  slots: Slot[]
  specialTasks: SpecialTask[]
}

const EMPTY_ALLOCATION_SNAPSHOT: AllocationSnapshot = {
  slots: [],
  specialTasks: [],
}

const formatToday = () =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

const escapeCsvValue = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`

export function DashboardPage({ employees }: DashboardPageProps) {
  const allocationSnapshot = loadFromLocalStorage<AllocationSnapshot>(
    STORAGE_KEYS.allocationState,
    EMPTY_ALLOCATION_SNAPSHOT,
  )

  const activeEmployees = employees.filter((employee) => employee.status === 'active')
  const presentEmployees = activeEmployees.filter((employee) => employee.active)
  const absentEmployees = activeEmployees.filter((employee) => !employee.active)

  const activeSlots = allocationSnapshot.slots.filter((slot) => slot.active)
  const assignedSlots = activeSlots.filter((slot) => Boolean(slot.assignetEmployeeId))
  const openSlots = activeSlots.filter((slot) => !slot.assignetEmployeeId)

  const activeSpecialTasks = allocationSnapshot.specialTasks.filter((task) => task.active)
  const assignedSpecialTasks = activeSpecialTasks.filter((task) => Boolean(task.assignedEmployeeId))
  const openSpecialTasks = activeSpecialTasks.filter((task) => !task.assignedEmployeeId)

  const totalOpenAssignments = openSlots.length + openSpecialTasks.length
  const totalAssignedAssignments = assignedSlots.length + assignedSpecialTasks.length
  const totalPlannedAssignments = activeSlots.length + activeSpecialTasks.length

  const rotationCompliance =
    totalPlannedAssignments === 0
      ? 0
      : Math.round((totalAssignedAssignments / totalPlannedAssignments) * 100)

  const trainingCoverage = TRAININGS_OPTIONS.map((training) => {
    const available = presentEmployees.filter((employee) => employee.trainings.includes(training)).length

    return {
      training,
      available,
    }
  })

  const employeesWithoutTraining = presentEmployees.filter((employee) => employee.trainings.length === 0)

  const openAssignments = [
    ...openSlots.map((slot) => ({
      id: slot.id,
      label: `Slot ${slot.area} ${slot.aisle}-${slot.location}`,
      type: 'Slot',
    })),
    ...openSpecialTasks.map((task) => ({
      id: task.id,
      label: `${task.group} - ${task.name}`,
      type: 'Task',
    })),
  ]

  const assignmentPressure = presentEmployees.length - totalPlannedAssignments
  const planningDay = formatToday()

  const handleExportCsv = () => {
    const summaryRows = [
      ['Dashboard day', planningDay],
      ['Active employees', activeEmployees.length],
      ['Present in pool', presentEmployees.length],
      ['Inactive employees', employees.length - activeEmployees.length],
      ['Open assignments', totalOpenAssignments],
      ['Coverage', `${rotationCompliance}%`],
      ['Active slots', activeSlots.length],
      ['Active special tasks', activeSpecialTasks.length],
      ['Assigned now', totalAssignedAssignments],
      ['Employees without training', employeesWithoutTraining.length],
      [
        'Assignment pressure',
        assignmentPressure >= 0
          ? `${assignmentPressure} people available after coverage`
          : `${Math.abs(assignmentPressure)} more people needed`,
      ],
    ]

    const lines = [
      'Section,Label,Value',
      ...summaryRows.map(([label, value]) =>
        [escapeCsvValue('Summary'), escapeCsvValue(label), escapeCsvValue(value)].join(','),
      ),
      '',
      'Section,Training,Available',
      ...trainingCoverage.map(({ training, available }) =>
        [escapeCsvValue('Training coverage'), escapeCsvValue(training), escapeCsvValue(available)].join(','),
      ),
      '',
      'Section,Type,Item',
      ...(openAssignments.length === 0
        ? [[escapeCsvValue('Open work'), escapeCsvValue('Info'), escapeCsvValue('All active slots and tasks are covered.')].join(',')]
        : openAssignments.map((assignment) =>
            [escapeCsvValue('Open work'), escapeCsvValue(assignment.type), escapeCsvValue(assignment.label)].join(','),
          )),
    ]

    const csv = lines.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
      link.download = `dashboard-overview-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-gradient-to-r from-white via-sky-50 to-cyan-50 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Dashboard</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl">Daily operations dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
              This overview is based on current employee and allocation data. It gives you a quick
              picture of availability, coverage, open work, and shift readiness.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-white/90 px-4 py-3 text-right shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Dashboard day</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{planningDay}</p>
            <div className="mt-3">
              <Button variant="secondary" onClick={handleExportCsv}>
                Export planner CSV
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Active employees</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{activeEmployees.length}</p>
          <p className="mt-2 text-sm text-slate-600">
            {employees.length - activeEmployees.length} employees are inactive in the base roster.
          </p>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Present in pool</p>
          <p className="mt-3 text-3xl font-bold text-sky-700">{presentEmployees.length}</p>
          <p className="mt-2 text-sm text-slate-600">
            {absentEmployees.length} active employees are not yet added to today&apos;s pool.
          </p>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Open assignments</p>
          <p className="mt-3 text-3xl font-bold text-amber-600">{totalOpenAssignments}</p>
          <p className="mt-2 text-sm text-slate-600">
            {openSlots.length} slots and {openSpecialTasks.length} special tasks still need coverage.
          </p>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Coverage</p>
          <p className="mt-3 text-3xl font-bold text-emerald-600">{rotationCompliance}%</p>
          <p className="mt-2 text-sm text-slate-600">
            {totalAssignedAssignments} of {totalPlannedAssignments} active assignments are currently filled.
          </p>
        </Card>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Shift readiness</h2>
              <p className="mt-1 text-sm text-slate-500">
                A real summary of the current pool against active slots and special tasks.
              </p>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                assignmentPressure >= 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {assignmentPressure >= 0
                ? `${assignmentPressure} people available after coverage`
                : `${Math.abs(assignmentPressure)} more people needed`}
            </div>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Active slots</dt>
              <dd className="mt-2 text-2xl font-bold text-slate-900">{activeSlots.length}</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Special tasks</dt>
              <dd className="mt-2 text-2xl font-bold text-slate-900">{activeSpecialTasks.length}</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Assigned now</dt>
              <dd className="mt-2 text-2xl font-bold text-slate-900">{totalAssignedAssignments}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Open work</h3>
              <span className="text-sm text-slate-500">{openAssignments.length} items</span>
            </div>

            {openAssignments.length === 0 ? (
              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                All active slots and tasks are covered.
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {openAssignments.slice(0, 8).map((assignment) => (
                  <li
                    key={assignment.id}
                    className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-900">{assignment.label}</span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                      {assignment.type}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Training coverage</h2>
          <p className="mt-1 text-sm text-slate-500">
            Available people in today&apos;s pool by skill area.
          </p>

          <div className="mt-5 space-y-3">
            {trainingCoverage.map(({ training, available }) => (
              <div key={training}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">{training}</span>
                  <span className="text-slate-500">{available} available</span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-sky-500"
                    style={{
                      width: `${presentEmployees.length === 0 ? 0 : (available / presentEmployees.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">No training assigned</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{employeesWithoutTraining.length}</p>
            <p className="mt-2 text-sm text-slate-600">
              People in the current pool without any registered training records.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Application preview</h2>
          <p className="mt-1 text-sm text-slate-500">
            A quick visual preview of the current app interface.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <img
              src={appPreviewImage}
              alt="Shift Allocation Automation System application preview"
              className="w-full rounded-xl border border-slate-200 object-cover shadow-sm"
            />
          </div>
        </Card>
      </div>
    </section>
  )
}
