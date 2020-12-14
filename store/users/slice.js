import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { STATUS_IDLE } from '../status'

const userAdapters = createEntityAdapter()

const userSlices = createSlice({
  name: 'users',
  initialState: userAdapters.getInitialState(),
  reducers: {
    resetStateUsers: state => {
      state.status = STATUS_IDLE
      state.error = null
      state.ids = []
      state.entities = {}
    },
    idleStateUsers: state => {
      state.status = STATUS_IDLE
    },
    userAddOne: userAdapters.addOne,
    userAddMany: userAdapters.addMany,
    userUpdateOne: userAdapters.updateOne,
    userUpdateMany: userAdapters.updateMany,
    userRemoveOne: userAdapters.removeOne,
    userRemoveMany: userAdapters.removeMany,
  },
})

export const {
  userAddOne,
  userAddMany,
  userUpdateOne,
  userUpdateMany,
  userRemoveOne,
  userRemoveMany,
  resetStateUsers,
  idleStateUsers,
} = userSlices.actions
export const userSelectors = userAdapters.getSelectors(state => state.users)

export default userSlices.reducer
