import { createSlice } from '@reduxjs/toolkit'

import { STATUS_SUCCESS, STATUS_ERROR, STATUS_IDLE, STATUS_LOADING } from '../status'
import { register } from './asyncThunk'

const initialState = {
  status: STATUS_IDLE,
  error: null,
  token: null,
  user: null,
}

const authSlices = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending]: state => {
      state.status = STATUS_LOADING
    },
    [register.fulfilled]: (state, action) => {
      state.status = STATUS_SUCCESS
    },
    [register.rejected]: state => {
      state.status = STATUS_ERROR
    },
  },
})

export default authSlices.reducer
