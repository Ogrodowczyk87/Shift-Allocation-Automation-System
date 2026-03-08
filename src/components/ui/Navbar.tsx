import type { Page } from '../../app/layout/page.types'
interface NavbarProps {
  activePage: Page
  onSelectPage: (page: Page) => void
}

const NAV_ITEMS: Array<{ id: Page; label: string }> = [
  { id: 'shift-planner', label: 'Shift Planner' },
  { id: 'people', label: 'Employees' },
  { id: 'history', label: 'AllocationPage' },
  { id: 'reports', label: 'Reports' },
]

export function Navbar({ activePage, onSelectPage }: NavbarProps) {
  return (
    <header className="border-b border-sky-200 bg-[#090979] bg-[linear-gradient(90deg,_rgba(9,9,121,1)_35%,_rgba(0,212,255,1)_100%)] backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          Shift Allocation System
        </a>
        <ul className="hidden items-center gap-6 text-sm font-medium text-white md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
              type="button"
              onClick={() => onSelectPage(item.id)}
              className={activePage === item.id ? 'text-white' : 'text-white hover:text-gray-200'}>
                {item.label}
              </button>
            </li>  
          ))}        
        </ul>
      </nav>
    </header>
  )
}
