import { getAccessToken } from '../tokenStore'

const GRAPHQL_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/graphql'

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
  const token = getAccessToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
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
