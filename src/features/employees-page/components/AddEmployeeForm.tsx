import { useState } from "react"
import type { FormEvent } from "react"
import type { Employee } from "../../../models/Employee"
import { PhotoUpload } from "../../../components/ui/FileUploadInput"

type AddEmployeeFormProps = {
  onCancel: () => void
  onSubmit: (employee: Omit<Employee, "id">) => void
}

export function AddEmployeeForm({ onCancel, onSubmit }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [id, setId] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ firstName: firstName.trim(), lastName: lastName.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
            <PhotoUpload />
        </div>
      <div>
        <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
          First name
        </label>
        <input
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-300 focus:ring-2"
          placeholder="first name"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
          Last name
        </label>
        <input
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-300 focus:ring-2"
          placeholder="last name"
          required
        />
      </div>
      <div>
        <label htmlFor="id" className="mb-1 block text-sm font-medium text-slate-700">
          ID
        </label>
        <input
          id="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-300 focus:ring-2"
          placeholder="employee ID"
          required
        />
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
