import {createSlice} from '@reduxjs/toolkit'
import Router from 'next/router'

import {register, login} from './handler'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    isAuthenticated: false
  },
  reducers: {

  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.error = null
      Router.push('/login')
    },
    [register.rejected]: (state, action) => {
      state.error = action.error.message
    },
    [login.fulfilled]: (state, action) => {
      state.error = null
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message
    },
  }
})

export const selectAuth = (state) => state.auth

export default authSlice.reducer
