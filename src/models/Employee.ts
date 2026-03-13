
export const TRAININGS_OPTIONS = ['Stov', 'Induct', 'Problem Solving', 'Divert'] as const
export type Training = typeof TRAININGS_OPTIONS[number]

export const EMPLOYEE_STATUSES_OPTIONS = ['active', 'inactive'] as const
export type EmployeeStatus = typeof EMPLOYEE_STATUSES_OPTIONS[number]

export interface Employee {
  id: string
  firstName: string
  lastName: string
  photoUrl?: string
  trainings: Training[]
  status: EmployeeStatus
  active: boolean
}

export interface Slot {
  id: string
  area: "A" | "B" | "C" | "D"
  aisle: number,
  location: number,
  active: boolean,
  assignetEmployeeId?: string | null
}

export type AllocationState = {
  employees: Employee[];
  slots: Slot[];
};


