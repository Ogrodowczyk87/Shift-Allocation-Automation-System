const SIDEBAR_ITEMS = ['Shift Planner', 'People', 'History', 'Reports']

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sky-200 bg-white lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-700">Navigation</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm text-sky-900 transition hover:bg-sky-100"
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
