type AllocationToolbarProps = {
  poolCount: number
  onAllocate: () => void
}

export function AllocationToolbar({ poolCount, onAllocate }: AllocationToolbarProps) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-200 bg-white p-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Allocation</h1>
        <p className="text-sm text-slate-600">
          Employees in pool: <span className="font-semibold text-slate-900">{poolCount}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onAllocate}
        disabled={poolCount === 0}
        className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        Allocate
      </button>
    </section>
  )
}
