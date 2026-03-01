import type { Employee } from "../../../models/Employee"
import { AddEmployeeForm } from "./AddEmployeeForm"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function AddEmployeeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  const handleSubmit = (employee: Omit<Employee, "id">) => {
    // Placeholder for API/store integration.
    console.log("New employee:", employee)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Add Employee</h2>
        <AddEmployeeForm onCancel={onClose} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default AddEmployeeModal
