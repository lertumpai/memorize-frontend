import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './auth/slice'

const rootReducer = {
  auth: authReducer,
}

const config = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}

export default createWrapper(config)
