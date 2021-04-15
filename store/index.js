import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './auth/slice'
import userReducer from './users/slice'
import articleReducer from './articles/slice'
import commentReducer from './comments/slice'

const rootReducer = {
  auth: authReducer,
  users: userReducer,
  articles: articleReducer,
  comments: commentReducer,
}

const config = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    // devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createWrapper(config)
