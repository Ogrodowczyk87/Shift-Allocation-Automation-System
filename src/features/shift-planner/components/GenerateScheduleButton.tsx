interface GenerateScheduleButtonProps {
  onClick: () => void
}

export function GenerateScheduleButton({ onClick }: GenerateScheduleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
    >
      Generate
    </button>
  )
}
