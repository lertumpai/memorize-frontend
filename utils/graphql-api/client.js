import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SERVER_URL, SERVER_URL_PATH } = publicRuntimeConfig

import { loadUser } from '../localStorage'
const httpLink = createHttpLink({
  uri: `${SERVER_URL}${SERVER_URL_PATH}`,
})

const authLink = setContext((_, { headers }) => {
  const currentUser = loadUser()
  return {
    headers: {
      ...headers,
      authorization: currentUser ? `Memorize ${currentUser.token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
})

export async function mutation(gql, variables) {
  const response = await client.mutate({ mutation: gql, variables, errorPolicy: 'all' })

  if (response.errors) {
    throw response.errors[0]['message']
  }

  return response.data
}

export async function query(gql, variables) {
  const response = await client.query({ query: gql, variables, errorPolicy: 'all', fetchPolicy: 'no-cache' })

  if (response.errors) {
    throw response.errors[0]['message']
  }

  return response.data
}

export default client
