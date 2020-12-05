import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const userAdapters = createEntityAdapter()

const userSlices = createSlice({
  name: 'users',
  initialState: userAdapters.getInitialState(),
  reducers: {
    userAddOne: userAdapters.addOne,
    userAddMany: userAdapters.addMany,
    userUpsertMany: userAdapters.upsertMany,
    userUpdateMany: userAdapters.updateMany,
    userRemoveOne: userAdapters.removeOne,
  },
  extraReducers: {

  },
})

export const { userAdded, userAddMany, userUpdateMany, userUpsertMany } = userSlices.actions
export const userSelectors = userAdapters.getSelectors(state => state.users)
