export function Navbar() {
  return (
    <header className="border-b border-sky-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-semibold tracking-tight text-sky-900">
          Shift Allocation System
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-sky-800 md:flex">
          <li><a href="#" className="hover:text-sky-600">People</a></li>
          <li><a href="#" className="hover:text-sky-600">Shift Planner</a></li>
          <li><a href="#" className="hover:text-sky-600">History</a></li>
          <li><a href="#" className="hover:text-sky-600">Reports</a></li>
        </ul>
      </nav>
    </header>
  )
}
