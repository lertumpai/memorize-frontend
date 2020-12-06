import { ApolloClient, InMemoryCache } from '@apollo/client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const client = new ApolloClient({
  uri: publicRuntimeConfig.SERVER_URL,
  cache: new InMemoryCache(),
})

export async function mutation(gql, variables) {
  const response = await client.mutate({ mutation: gql, variables, errorPolicy: 'all' })

  if (response.errors) {
    throw response.errors[0]['message']
  }

  return response.data
}

export default client
