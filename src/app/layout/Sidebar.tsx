import type { Page } from './page.types'

const SIDEBAR_ITEMS: Array<{ id: Page; label: string }> = [
  { id: 'shift-planner', label: 'Shift Planner' },
  { id: 'people', label: 'Employees' },
  { id: 'history', label: 'AllocationPage' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
]

interface SidebarProps {
  activePage: Page
  onSelectPage: (page: Page) => void
}

export function Sidebar({ activePage, onSelectPage }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sky-200 bg-white lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-700">Navigation</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectPage(item.id)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    activePage === item.id ? 'bg-sky-200 text-sky-950' : 'text-sky-900 hover:bg-sky-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
