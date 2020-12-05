import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
