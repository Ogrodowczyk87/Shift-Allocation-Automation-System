import { useState } from "react"
import type { Employee } from "../../models/Employee"
import { AddEmpyeeCard } from "./components/AddEmpyeeCard"
import { AddEmployeeModal } from "./components/AddEmployeeModal"

type Props = {
  onAddEmployee: (employee: Employee) => void
}

export const AddEmployee = ({ onAddEmployee }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AddEmpyeeCard onClick={() => setIsOpen(true)} />

      <AddEmployeeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddEmployee={onAddEmployee}
      />
    </>
  )
}
