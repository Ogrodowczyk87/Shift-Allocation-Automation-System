import { graphqlRequest } from './graphqlClient'

export type AssignmentHistoryEntry = {
  id?: string
  assignmentDate: string
  employeeId: string
  taskId: string
  assignmentType: string
  source: string
}

type AssignmentHistoryResponse = {
  assignmentHistory: AssignmentHistoryEntry[]
}

type SaveAssignmentHistoryResponse = {
  saveAssignmentHistory: boolean
}

export async function fetchAssignmentHistory(date: string) {
  const query = `
    query AssignmentHistory($date: String!) {
      assignmentHistory(date: $date) {
        id
        assignmentDate
        employeeId
        taskId
        assignmentType
        source
        createdAt
      }
    }
  `

  const data = await graphqlRequest<AssignmentHistoryResponse>(query, { date })
  return data.assignmentHistory
}

export async function saveAssignmentHistory(entries: AssignmentHistoryEntry[]) {
  const mutation = `
    mutation SaveAssignmentHistory($entries: [AssignmentHistoryInput!]!) {
      saveAssignmentHistory(entries: $entries)
    }
  `

  const data = await graphqlRequest<SaveAssignmentHistoryResponse>(mutation, {
    entries,
  })

  return data.saveAssignmentHistory
}
