import { useState, useMemo } from 'react'
import { AddEmployee } from './AddEmployee'
import type { Employee, EmployeeStatus, Training } from '../../models/Employee'
import { TRAININGS_OPTIONS } from '../../models/Employee'
import { buildEmployeeAvatarUrl, resolveEmployeePhotoUrl } from '../../utils/employeeAvatar'

type EmployeesPageProps = {
  employees: Employee[]
  onAddEmployee: (employee: Employee) => void
  onAddEmployeesToPool: (ids: string[]) => void
  onArchiveEmployee: (id: string) => Promise<void> | void
}

export function EmployeesPage({
  employees,
  onAddEmployee,
  onArchiveEmployee,
  onAddEmployeesToPool,
}: EmployeesPageProps) {

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [trainingFilter, setTrainingFilter] = useState<'All Trainings' | Training>('All Trainings')
  const [statusFilter, setStatusFilter] = useState<'All Statuses' | EmployeeStatus>('All Statuses')
  const [search, setSearch] = useState('')

  const poolCount = employees.filter((employee) => employee.active).length
  const activeStatusCount = employees.filter((employee) => employee.status === 'active').length
  const existingEmployeeIds = employees.map((employee) => employee.id)

  const handleAllocateSelected = () => {
    if (selectedIds.length === 0) return
    onAddEmployeesToPool(selectedIds)
    setSelectedIds([])
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const byTraining =
        trainingFilter === 'All Trainings' || e.trainings.includes(trainingFilter)
      const byStatus =
        statusFilter === 'All Statuses' || e.status === statusFilter
      const q = search.trim().toLowerCase()
      const bySearch =
        q.length === 0 ||
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)

      return byTraining && byStatus && bySearch
    })
  }, [employees, trainingFilter, statusFilter, search])

  const allVisibleSelected =
    filteredEmployees.length > 0 &&
    filteredEmployees.every((e) => selectedIds.includes(e.id))

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      const visibleIds = new Set(filteredEmployees.map((e) => e.id))
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.has(id)))
      return
    }
    const visibleIds = filteredEmployees.map((e) => e.id)
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])))
  }

  return (
    <div className="flex items-start gap-4">
      <section className="flex-1 overflow-hidden rounded-2xl border border-sky-200 bg-white text-slate-900 shadow-sm">
        <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Employees</p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900">Team pool and selection</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                Total: <span className="font-semibold text-slate-900">{employees.length}</span>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                Active status: <span className="font-semibold text-slate-900">{activeStatusCount}</span>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                In pool: <span className="font-semibold text-slate-900">{poolCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
              <p className="mt-1 text-sm text-slate-500">Filter employees by training, status, or quick search.</p>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Training</span>
                <select
                  value={trainingFilter}
                  onChange={(e) => setTrainingFilter(e.target.value as 'All Trainings' | Training)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-300"
                >
                  <option>All Trainings</option>
                  {TRAININGS_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'All Statuses' | EmployeeStatus)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-300"
                >
                  <option>All Statuses</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Search</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Selection</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Selected: <span className="font-medium text-slate-900">{selectedIds.length}</span>
                  {' '}of{' '}
                  <span className="font-medium text-slate-900">{filteredEmployees.length}</span> visible employees
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={toggleSelectAllVisible}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
                >
                  {allVisibleSelected ? 'Deselect visible' : 'Select visible'}
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
                >
                  Clear selection
                </button>
                <button
                  onClick={handleAllocateSelected}
                  disabled={selectedIds.length === 0}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Add selected to pool
                </button>
              </div>
            </div>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
              No employees match the selected filters.
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredEmployees.map((employee) => {
                const isSelected = selectedIds.includes(employee.id)

                return (
                  <li
                    key={employee.id}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      isSelected
                        ? 'border-sky-200 bg-sky-50/80 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40'
                    }`}
                  >
                    <label className="flex cursor-pointer flex-wrap items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(employee.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-sky-600"
                      />

                      <img
                        src={resolveEmployeePhotoUrl(employee)}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        onError={(event) => {
                          event.currentTarget.onerror = null
                          event.currentTarget.src = buildEmployeeAvatarUrl(employee)
                        }}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                      />

                      <div className="min-w-[180px]">
                        <p className="font-medium text-slate-900">{employee.firstName} {employee.lastName}</p>
                        <p className="text-sm text-slate-500">#{employee.id}</p>
                      </div>

                      <div className="flex flex-1 flex-wrap gap-1.5">
                        {employee.trainings.length === 0 ? (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">No trainings</span>
                        ) : (
                          employee.trainings.map((t) => (
                            <span key={t} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">{t}</span>
                          ))
                        )}
                      </div>

                      <div className="ml-auto flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          {employee.status}
                        </span>
                        {employee.active ? (
                          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">In pool</span>
                        ) : null}
                        {isSelected ? (
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
                            Selected
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault()
                            const confirmed = window.confirm(
                              `Archive employee ${employee.firstName} ${employee.lastName}?`
                            )
                            if (!confirmed) return
                            void onArchiveEmployee(employee.id)
                          }}
                          className="rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </label>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <AddEmployee
        onAddEmployee={onAddEmployee}
        existingEmployeeIds={existingEmployeeIds}
      />
    </div>
  )
}
