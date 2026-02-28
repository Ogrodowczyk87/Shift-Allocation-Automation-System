import type { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  className?: string
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return <tr className={`border-t border-slate-800 ${className}`.trim()}>{children}</tr>
}
