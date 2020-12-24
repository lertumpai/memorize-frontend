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
    userUpsertOne: userAdapters.upsertOne,
    userAddMany: userAdapters.addMany,
    userUpsertMany: userAdapters.upsertMany,
    userRemoveOne: userAdapters.removeOne,
    userRemoveMany: userAdapters.removeMany,
  },
})

export const {
  userAddOne,
  userUpsertOne,
  userAddMany,
  userUpsertMany,
  userRemoveOne,
  userRemoveMany,
  resetStateUsers,
  idleStateUsers,
} = userSlices.actions
export const userSelectors = userAdapters.getSelectors(state => state.users)

export default userSlices.reducer
