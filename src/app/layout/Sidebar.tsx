const SIDEBAR_ITEMS = ['Shift Planner', 'People', 'History', 'Reports']

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/70 lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-900 hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
