import React from 'react'
import { ApolloProvider } from '@apollo/client'

import client from '../utils/graphql-api/client'

const MyApp = ({ Component, pageProps }) => {
  return (
    // <Provider store={store}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    // </Provider>
  )
}

export default MyApp
