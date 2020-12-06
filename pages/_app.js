import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from '../store'
import client from '../utils/graphql-api/client'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
