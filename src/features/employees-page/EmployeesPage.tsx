import { useState, useMemo } from 'react'
import { AddEmployee } from './AddEmployee'
import type { Employee, EmployeeStatus, Training } from '../../models/Employee'
import { TRAININGS_OPTIONS } from "../../models/Employee"


export function EmployeesPage() {
   const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [trainingFilter, setTrainingFilter] = useState<"All Trainings" | Training>("All Trainings")
  const [statusFilter, setStatusFilter] = useState<"All Statuses" | EmployeeStatus>("All Statuses")
  const [search, setSearch] = useState("")

  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee])
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const byTraining =
        trainingFilter === "All Trainings" || e.trainings.includes(trainingFilter)
      const byStatus =
        statusFilter === "All Statuses" || e.status === statusFilter
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
    <div className="flex gap-4">
      <section className="flex-1 rounded-lg border border-sky-200 bg-white p-6 text-slate-900">
        <h1 className="text-xl font-semibold">Employees</h1>

        <div className="mt-4 rounded-md border bg-slate-50 p-3">
          <div className="flex flex-wrap items-center gap-3">
            <select value={trainingFilter} onChange={(e) => setTrainingFilter(e.target.value as any)} className="rounded-md border px-3 py-2">
              <option>All Trainings</option>
              {TRAININGS_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="rounded-md border px-3 py-2">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="min-w-[220px] rounded-md border px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-3 rounded-md border bg-sky-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Selected: {selectedIds.length}
            </span>
            <div className="flex gap-2">
              <button onClick={toggleSelectAllVisible} className="rounded-md border bg-white px-3 py-1 text-sm">
                {allVisibleSelected ? "Deselect visible" : "Select visible"}
              </button>
              <button onClick={() => setSelectedIds([])} className="rounded-md border bg-white px-3 py-1 text-sm">
                Clear selection
              </button>
            </div>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No employees match the selected filters.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {filteredEmployees.map((employee) => (
              <li key={employee.id} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(employee.id)}
                  onChange={() => toggleSelect(employee.id)}
                  className="h-4 w-4"
                />

                <img
                  src={employee.photoUrl || "https://via.placeholder.com/40?text=+"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="min-w-[180px]">
                  <span className="font-medium">{employee.firstName} {employee.lastName}</span>
                  <span className="ml-2 text-sm text-slate-500">#{employee.id}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {employee.trainings.length === 0 ? (
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">No trainings</span>
                  ) : (
                    employee.trainings.map((t) => (
                      <span key={t} className="rounded bg-sky-100 px-2 py-0.5 text-xs text-sky-700">{t}</span>
                    ))
                  )}
                </div>

                <span className="ml-auto rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                  {employee.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AddEmployee onAddEmployee={handleAddEmployee} />
    </div>
  )
}
