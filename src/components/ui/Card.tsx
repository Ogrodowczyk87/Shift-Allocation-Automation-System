import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'div'
  children: ReactNode
}

export function Card({ as: Component = 'section', children, className = '', ...props }: CardProps) {
  return (
    <Component className={`rounded-lg border border-slate-800 bg-slate-900 p-4 ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}
