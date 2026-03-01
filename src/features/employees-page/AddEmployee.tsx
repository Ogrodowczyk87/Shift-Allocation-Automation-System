import { useState } from "react"
import { AddEmpyeeCard } from "./components/AddEmpyeeCard"
import { AddEmployeeModal } from "./components/AddEmployeeModal"

export const AddEmployee = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AddEmpyeeCard onClick={() => setIsOpen(true)} />

      <AddEmployeeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
