import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/slice'

const rootReducer = {
  auth: authReducer,
}

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
