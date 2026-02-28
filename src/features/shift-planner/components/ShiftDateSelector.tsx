interface ShiftDateSelectorProps {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export function ShiftDateSelector({ value, options, onChange }: ShiftDateSelectorProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">Date</span>
      <select
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400/50 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
