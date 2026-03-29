import type { Employee, Slot, SpecialTask } from '../../../models/Employee'
import { AllocationBoard } from './AllocationBoard'

type AllocationBoardTabProps = {
  slots: Slot[]
  specialTasks: SpecialTask[]
  employeesById: Map<string, Employee>
}

export function AllocationBoardTab({
  slots,
  specialTasks,
  employeesById,
}: AllocationBoardTabProps) {
  return (
    <AllocationBoard
      slots={slots}
      specialTasks={specialTasks}
      employeesById={employeesById}
    />
  )
}
