import { createSlice } from '@reduxjs/toolkit'

import { STATUS_SUCCESS, STATUS_ERROR, STATUS_IDLE, STATUS_LOADING } from '../status'
import { register, login } from './asyncThunk'

const initialState = {
  status: STATUS_IDLE,
  error: null,
  user: null,
}

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStateAuth: state => {
      state.error = null
      state.user = null
      state.status = STATUS_IDLE
    },
    idleStateAuth: state => {
      state.status = STATUS_IDLE
    },
  },
  extraReducers: {
    [register.pending]: state => {
      state.status = STATUS_LOADING
    },
    [register.fulfilled]: (state, action) => {
      state.error = null
      state.user = action.payload
      state.status = STATUS_SUCCESS
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload
      state.user = null
      state.status = STATUS_ERROR
    },
    [login.pending]: state => {
      state.status = STATUS_LOADING
    },
    [login.fulfilled]: (state, action) => {
      state.error = null
      state.user = action.payload
      state.status = STATUS_SUCCESS
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.user = null
      state.status = STATUS_ERROR
    },
  },
})

export const { resetStateAuth, idleStateAuth } = authSlices.actions

export default authSlices.reducer
