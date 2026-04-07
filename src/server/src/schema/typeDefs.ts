export const typeDefs = `#graphql
  type Employee {
    id: ID!
    employeeId: String!
    firstName: String!
    lastName: String!
    status: String!
    active: Boolean!
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

  input AssignmentHistoryInput {
    assignmentDate: String!
    employeeId: String!
    taskId: String!
    assignmentType: String!
    source: String!
  }

  type Query {
    health: String!
    employees: [Employee!]!
    assignmentHistory(date: String!): [AssignmentHistoryEntry!]!
  }

  type Mutation {
    addEmployee(
      employeeId: String!
      firstName: String!
      lastName: String!
    ): Employee!

    saveAssignmentHistory(entries: [AssignmentHistoryInput!]!): Boolean!
  }
`
