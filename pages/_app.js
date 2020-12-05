import React from 'react'
import { Provider } from 'react-redux'

import store from '../stores/slices/store'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
