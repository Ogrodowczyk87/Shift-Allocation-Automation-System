export type ShiftType = 'Day' | 'Night'

interface ShiftTypeSelectorProps {
  value: ShiftType
  onChange: (value: ShiftType) => void
}

export function ShiftTypeSelector({ value, onChange }: ShiftTypeSelectorProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">Shift type</span>
      <select
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-400/50 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value as ShiftType)}
      >
        <option value="Day">Day</option>
        <option value="Night">Night</option>
      </select>
    </label>
  )
}
