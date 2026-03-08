import { useState } from "react"
import type { FormEventHandler } from "react"
import type { Employee, EmployeeStatus, Training } from "../../../models/Employee"
import { TRAININGS_OPTIONS } from "../../../models/Employee"
import { PhotoUpload } from "../../../components/ui/FileUploadInput"

type AddEmployeeFormProps = {
  onCancel: () => void
  onSubmit: (employee: Employee) => void
}

export function AddEmployeeForm({ onCancel, onSubmit }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [id, setId] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [trainings, setTrainings] = useState<Training[]>([])
  const [status, setStatus] = useState<EmployeeStatus>("active")

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmit({
      id: id.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      photoUrl: photoUrl.trim() || undefined,
      trainings,
      status,
      active: false,
    })
  }

  const toggleTraining = (training: Training) => {
    setTrainings((prev) =>
      prev.includes(training) ? prev.filter((t) => t !== training) : [...prev, training]
    )
  }



  return (
   <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <PhotoUpload onChange={setPhotoUrl} />

      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="first name" className="w-full rounded-md border px-3 py-2" required />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="last name" className="w-full rounded-md border px-3 py-2" required />
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="employee ID" className="w-full rounded-md border px-3 py-2" required />

      <div className="grid gap-2">
        <p className="text-sm font-medium">Trainings</p>
        {TRAININGS_OPTIONS.map((training) => (
          <label key={training} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={trainings.includes(training)}
              onChange={() => toggleTraining(training)}
              className="h-4 w-4"
            />
            {training}
          </label>
        ))}
      </div>

      {/* <div className="grid gap-2">
        <p className="text-sm font-medium">Status</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as EmployeeStatus)}
          className="rounded-md border px-3 py-2"
        >
          {EMPLOYEE_STATUSES_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div> */}

      <div className="pt-2">
        <button type="button" onClick={onCancel} className="rounded-md bg-slate-200 px-4 py-2">Cancel</button>
        <button type="submit" className="ml-2 rounded-md bg-sky-500 px-4 py-2 text-white">Add</button>
      </div>
    </form>
  )
}

export default AddEmployeeForm
