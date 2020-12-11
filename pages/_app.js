import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { compose } from 'redux'
import 'react-datetime/css/react-datetime.css'

import PrivateContainer from '../containers/PrivateContainer/dynamic'
import reduxWrapper from '../store'
import client from '../utils/graphql-api/client'

import '../public/style/style.scss'

const MyApp = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client}>
      <PrivateContainer>
        <Component {...pageProps} />
      </PrivateContainer>
    </ApolloProvider>
  )
}

export default compose(reduxWrapper.withRedux)(MyApp)
