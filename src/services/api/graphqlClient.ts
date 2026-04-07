const GRAPHQL_URL = 'http://localhost:4000/graphql'

type GraphQLError = {
  message: string
}

type GraphQLResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`)
  }

  const result: GraphQLResponse<T> = await response.json()

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  if (!result.data) {
    throw new Error('GraphQL response did not return any data')
  }

  return result.data
}
