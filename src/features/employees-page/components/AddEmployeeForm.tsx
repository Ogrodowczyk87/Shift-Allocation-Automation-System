import { useState } from "react"
import type { FormEvent } from "react"
import type { Employee } from "../../../models/Employee"
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      id: id.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      photoUrl: photoUrl.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <PhotoUpload onChange={setPhotoUrl} />
      </div>
      <div className="grid gap-4">
        <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
          First name
        </label>
        <input
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="first name"
          required
        />
      </div>

      <div className="grid gap-4">
        <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
          Last name
        </label>
        <input
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="last name"
          required
        />
      </div>
      <div className="grid gap-4">
        <label htmlFor="id" className="mb-1 block text-sm font-medium text-slate-700">
          ID
        </label>
        <input
          id="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="employee ID"
          required
        />
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-medium text-slate-700">Trainings</p>
        <label htmlFor="training-stov" className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-yellow-50 px-2 py-1 text-sm text-slate-700">
          <input type="checkbox" id="training-stov" className="h-4 w-4 accent-yellow-700" />
          Stov
        </label>
        <label htmlFor="training-induct" className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-rose-50 px-2 py-1 text-sm text-slate-700">
          <input type="checkbox" id="training-induct" className="h-4 w-4 accent-rose-600" />
          Induct
        </label>
        <label htmlFor="training-problem-solve" className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-emerald-50 px-2 py-1 text-sm text-slate-700">
          <input type="checkbox" id="training-problem-solve" className="h-4 w-4 accent-emerald-600" />
          Problem Solve
        </label>
        <label htmlFor="training-divert" className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-sky-50 px-2 py-1 text-sm text-slate-700">
          <input type="checkbox" id="training-divert" className="h-4 w-4 accent-sky-600" />
          Divert
        </label>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300"
        >
          Cancel
        </button>
        <button type="submit" className="ml-2 rounded-md bg-sky-500 px-4 py-2 text-white hover:bg-sky-600">
          Add
        </button>
      </div>
    </form>
  )
}

export default AddEmployeeForm
