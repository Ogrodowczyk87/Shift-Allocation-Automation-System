import { useState } from "react"
import type { SubmitEventHandler } from "react"
import type { Employee, Training } from "../../../models/Employee"
import { TRAININGS_OPTIONS } from "../../../models/Employee"
import { PhotoUpload } from "../../../components/ui/FileUploadInput"
import { buildEmployeeAvatarUrl } from "../../../utils/employeeAvatar"

type AddEmployeeFormProps = {
  onCancel: () => void
  onSubmit: (employee: Employee) => Promise<void> | void
  existingEmployeeIds: string[]
}

export function AddEmployeeForm({ onCancel, onSubmit, existingEmployeeIds }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [id, setId] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [trainings, setTrainings] = useState<Training[]>([])
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const normalizedFirstName = firstName.trim()
    const normalizedLastName = lastName.trim()
    const normalizedId = id.trim()
   
    if (!normalizedFirstName || !normalizedLastName || !normalizedId) {
      setError("All fields are required.")
      return
    }

    const duplicateId = existingEmployeeIds.some((existingId) => existingId === normalizedId)

    if (duplicateId) {
      setError("Employee ID already exists.")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      await onSubmit({
        id: normalizedId,
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        photoUrl:
          photoUrl.trim() ||
          buildEmployeeAvatarUrl({
            id: normalizedId,
            firstName: normalizedFirstName,
            lastName: normalizedLastName,
          }),
        trainings,
        status: "active",
        active: false,
      })
    } catch (submitError) {
      console.error(submitError)
      setError("Failed to add employee. Please check backend and database setup.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const toggleTraining = (training: Training) => {
    setTrainings((prev) =>
      prev.includes(training) ? prev.filter((t) => t !== training) : [...prev, training]
    )
  }

  return (
   <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <PhotoUpload employeeId={id} onChange={setPhotoUrl} />

      <input value={firstName} onChange={(e) => {
        setFirstName(e.target.value)
        setError("")
      }} placeholder="first name" className="w-full rounded-md border px-3 py-2" required />
      <input value={lastName} onChange={(e) => {
        setLastName(e.target.value)
        setError("")
      }} placeholder="last name" className="w-full rounded-md border px-3 py-2" required />
      <input value={id} onChange={(e) => {
        setId(e.target.value)
        setError("")
      }} placeholder="employee ID" className="w-full rounded-md border px-3 py-2" required />


    {error ? (
  <p className="text-sm text-rose-600">{error}</p>
) : null}


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
      <div className="pt-2">
        <button type="button" onClick={onCancel} className="rounded-md bg-slate-200 px-4 py-2">Cancel</button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-2 rounded-md bg-sky-500 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default AddEmployeeForm
