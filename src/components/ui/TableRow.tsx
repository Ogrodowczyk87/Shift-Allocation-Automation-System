import type { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  className?: string
}

export function TableRow({ children, className = '' }: TableRowProps) {
  return <tr className={`border-t border-sky-100 ${className}`.trim()}>{children}</tr>
}
