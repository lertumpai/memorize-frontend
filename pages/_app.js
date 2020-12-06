import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { compose } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import reduxWrapper from '../store'
import client from '../utils/graphql-api/client'

const MyApp = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default compose(reduxWrapper.withRedux)(MyApp)
