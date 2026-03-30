export const typeDefs = `#graphql
  type Employee {
    id: ID!
    employeeId: String!
    firstName: String!
    lastName: String!
    status: String!
    active: Boolean!
  }

  type Query {
    health: String!
    employees: [Employee!]!
  }

  type Mutation {
    addEmployee(
      employeeId: String!
      firstName: String!
      lastName: String!
    ): Employee!
  }
`
