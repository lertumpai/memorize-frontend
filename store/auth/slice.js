import { createSlice } from '@reduxjs/toolkit'

import { STATUS_SUCCESS, STATUS_ERROR, STATUS_IDLE, STATUS_LOADING } from '../status'
import { register, login, mutationProfile } from './asyncThunk'

const initialState = {
  status: STATUS_IDLE,
  error: null,
  currentUser: null,
}

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStateAuth: state => {
      state.error = null
      state.currentUser = null
      state.status = STATUS_IDLE
    },
    idleStateAuth: state => {
      state.status = STATUS_IDLE
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload
    },
  },
  extraReducers: {
    [register.pending]: state => {
      state.status = STATUS_LOADING
    },
    [register.fulfilled]: (state, action) => {
      state.error = null
      state.currentUser = action.payload
      state.status = STATUS_SUCCESS
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload
      state.currentUser = null
      state.status = STATUS_ERROR
    },
    [login.pending]: state => {
      state.status = STATUS_LOADING
    },
    [login.fulfilled]: (state, action) => {
      state.error = null
      state.currentUser = action.payload
      state.status = STATUS_SUCCESS
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.currentUser = null
      state.status = STATUS_ERROR
    },
    [mutationProfile.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutationProfile.fulfilled]: (state, action) => {
      state.error = null
      state.currentUser.profile = action.payload.profile.profile
      state.status = STATUS_SUCCESS
    },
  },
})

export const { resetStateAuth, idleStateAuth, setCurrentUser } = authSlices.actions

export default authSlices.reducer
