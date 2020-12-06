import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { compose } from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrivateRoute from '../containers/PrivateRoute/PrivateRoute'
import reduxWrapper from '../store'
import client from '../utils/graphql-api/client'

const MyApp = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client}>
      <PrivateRoute>
        <Component {...pageProps} />
      </PrivateRoute>
    </ApolloProvider>
  )
}

export default compose(reduxWrapper.withRedux)(MyApp)
