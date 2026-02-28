export type ShiftType = 'Day' | 'Night'

interface ShiftTypeSelectorProps {
  value: ShiftType
  onChange: (value: ShiftType) => void
}

export function ShiftTypeSelector({ value, onChange }: ShiftTypeSelectorProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-sky-900">Shift type</span>
      <select
        className="rounded-md border border-sky-300 bg-white px-3 py-2 text-slate-800 outline-none ring-sky-300/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value as ShiftType)}
      >
        <option value="Day">Day</option>
        <option value="Night">Night</option>
      </select>
    </label>
  )
}
