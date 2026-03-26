export interface ScheduleRole {
  id: string
  name: string
}

export interface AssignedEmployee {
  id: string
  firstName: string
  lastName: string
}

export interface ScheduleItem {
  role: ScheduleRole
  assignedEmployee?: AssignedEmployee
}
