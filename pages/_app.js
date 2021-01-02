import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import 'react-datetime/css/react-datetime.css'

import PrivateContainer from '../containers/PrivateContainer/dynamic'
import reduxWrapper from '../store'
import client from '../utils/graphql-api/client'
import { SOCKET_DISCONNECTED, SOCKET_CONNECTED } from '../store/status'
import { connectSocket, disconnectSocket } from '../store/socket/slice'

import '../public/style/style.scss'

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.socket)

  useEffect(() => dispatch(disconnectSocket()), [])
  useEffect(() => {
    if (status === SOCKET_DISCONNECTED) {
      dispatch(connectSocket())
    }
  }, [status])

  return (
    <ApolloProvider client={client}>
      <PrivateContainer>
        <Component {...pageProps} />
      </PrivateContainer>
    </ApolloProvider>
  )
}

export default compose(reduxWrapper.withRedux)(MyApp)
