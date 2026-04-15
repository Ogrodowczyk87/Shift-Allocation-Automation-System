import { graphqlRequest } from './graphqlClient'
import type { Employee } from '../../models/Employee'

type EmployeesResponse = {
  employees: Employee[]
}

type AddEmployeeResponse = {
  addEmployee: Employee
}

type ArchiveEmployeeResponse = {
  archiveEmployee: boolean
}

type CreateEmployeePhotoUploadResponse = {
  createEmployeePhotoUpload: {
    uploadUrl: string
    fileUrl: string
    fileKey: string
  }
}

export async function fetchEmployees() {
  const query = `
    query Employees {
      employees {
        id
        firstName
        lastName
        photoUrl
        trainings
        status
        active
        createdAt
        updatedAt
      }
    }
  `
  const data = await graphqlRequest<EmployeesResponse>(query)
  return data.employees
}

export async function addEmployee(employee: Employee) {
  const mutation = `
    mutation AddEmployee($input: AddEmployeeInput!) {
      addEmployee(input: $input) {
        id
        firstName
        lastName
        photoUrl
        trainings
        status
        active
        createdAt
        updatedAt
      }
    }
  `
  const data = await graphqlRequest<AddEmployeeResponse>(mutation, { input: employee })
  return data.addEmployee
}

export async function archiveEmployee(id: string) {
  const mutation = `
    mutation ArchiveEmployee($id: ID!) {
      archiveEmployee(id: $id)
    }
  `
  const data = await graphqlRequest<ArchiveEmployeeResponse>(mutation, { id })
  return data.archiveEmployee
}

export async function createEmployeePhotoUpload(fileName: string, fileType: string, employeeId: string) {
  const mutation = `
    mutation CreateEmployeePhotoUpload($fileName: String!, $fileType: String!, $employeeId: ID!) {
      createEmployeePhotoUpload(fileName: $fileName, fileType: $fileType, employeeId: $employeeId) {
        uploadUrl
        fileUrl
        fileKey
      }
    }
  `
  const data = await graphqlRequest<CreateEmployeePhotoUploadResponse>(mutation, {
    fileName,
    fileType,
    employeeId,
  })
  return data.createEmployeePhotoUpload
}
