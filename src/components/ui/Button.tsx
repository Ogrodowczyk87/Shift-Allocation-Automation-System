import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'success' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-sky-500 text-slate-950 hover:bg-sky-400',
  success: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
  secondary:
    'border border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-600 hover:text-white',
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-md px-4 py-2 text-sm font-semibold transition ${VARIANT_CLASSES[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
