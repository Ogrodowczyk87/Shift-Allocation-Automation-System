import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-sky-200 bg-white px-3 py-2 text-slate-800 hover:border-sky-300">
      <input type="checkbox" className={`h-4 w-4 accent-sky-400 ${className}`.trim()} {...props} />
      <span>{label}</span>
    </label>
  )
}
