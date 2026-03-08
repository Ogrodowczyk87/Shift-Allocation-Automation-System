import type { Employee } from '../models/Employee'

type EmployeeIdentity = Pick<Employee, 'firstName' | 'lastName' | 'id'>

export function buildEmployeeAvatarUrl(identity: EmployeeIdentity): string {
  const seed = encodeURIComponent(`${identity.firstName}-${identity.lastName}-${identity.id}`)
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&radius=50`
}

export function resolveEmployeePhotoUrl(employee: Employee): string {
  return employee.photoUrl?.trim() || buildEmployeeAvatarUrl(employee)
}
