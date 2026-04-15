export const typeDefs = `#graphql
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    photoUrl: String
    trainings: [String!]!
    status: String!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AssignmentHistoryEntry {
    id: ID!
    assignmentDate: String!
    employeeId: String!
    taskId: String!
    assignmentType: String!
    source: String!
    createdAt: String!
  }

  type EmployeePhotoUpload {
    uploadUrl: String!
    fileUrl: String!
    fileKey: String!
  }

  input AssignmentHistoryInput {
    assignmentDate: String!
    employeeId: String!
    taskId: String!
    assignmentType: String!
    source: String!
  }

  input AddEmployeeInput {
    id: ID!
    firstName: String!
    lastName: String!
    photoUrl: String
    trainings: [String!]!
    status: String!
    active: Boolean!
  }

  type Query {
    health: String!
    employees: [Employee!]!
    assignmentHistory(date: String!): [AssignmentHistoryEntry!]!
  }

  type Mutation {
    addEmployee(input: AddEmployeeInput!): Employee!
    archiveEmployee(id: ID!): Boolean!
    createEmployeePhotoUpload(fileName: String!, fileType: String!, employeeId: ID!): EmployeePhotoUpload!
    saveAssignmentHistory(entries: [AssignmentHistoryInput!]!): Boolean!
  }
`
