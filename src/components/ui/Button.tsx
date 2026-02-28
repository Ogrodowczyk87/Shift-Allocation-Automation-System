import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'success' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-500',
  success: 'bg-blue-700 text-white hover:bg-blue-600',
  secondary: 'border border-sky-300 bg-white text-sky-800 hover:bg-sky-50',
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
