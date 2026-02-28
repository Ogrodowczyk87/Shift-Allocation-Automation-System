import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'div'
  children: ReactNode
}

export function Card({ as: Component = 'section', children, className = '', ...props }: CardProps) {
  return (
    <Component className={`rounded-lg border border-sky-200 bg-white p-4 shadow-sm ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}
