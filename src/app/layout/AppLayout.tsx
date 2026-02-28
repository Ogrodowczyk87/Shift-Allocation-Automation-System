import type { ReactNode } from 'react'
import { Navbar } from '../../components/ui/Navbar'
import { Sidebar } from './Sidebar'
import type { Page } from './page.types'

interface AppLayoutProps {
  activePage: Page
  onSelectPage: (page: Page) => void
  children: ReactNode
}

export function AppLayout({ activePage, onSelectPage, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <Navbar activePage={activePage} onSelectPage={onSelectPage} />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar activePage={activePage} onSelectPage={onSelectPage} />
        <main className="min-h-[calc(100vh-4rem)] flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  )
}
