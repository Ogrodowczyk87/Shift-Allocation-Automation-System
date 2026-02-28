export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          Shift Allocation System
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <li><a href="#" className="hover:text-sky-300">People</a></li>
          <li><a href="#" className="hover:text-sky-300">Shift Planner</a></li>
          <li><a href="#" className="hover:text-sky-300">History</a></li>
          <li><a href="#" className="hover:text-sky-300">Reports</a></li>
        </ul>
      </nav>
    </header>
  )
}
