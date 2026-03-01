
type props = {
    onClick: () => void
}


export function AddEmpyeeCard({onClick}: props) {
  return (
    <div onClick={onClick} className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white p-6 text-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            +
        </div>
        <h3 className="text-lg font-semibold">Add Employee</h3>
        <p className="text-sm text-slate-500">
            Add a new employee
        </p>
    </div>
  )
}

export default AddEmpyeeCard