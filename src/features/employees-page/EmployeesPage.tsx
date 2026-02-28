import { AddEmployee } from './AddEmployee'

export function EmployeesPage() {
  return (
    <div className="space-y-4">
      <AddEmployee />
      <section className="rounded-lg border border-sky-200 bg-white p-6 text-slate-900">
        <h1 className="text-xl font-semibold">Employees</h1>
        <p className="mt-2 text-sm text-slate-600">This page is ready for people management features.</p>
      </section>
    </div>
  )
}
