import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCESS } from '../status'
import { queryComments } from './asyncThunk'

const commentAdapters = createEntityAdapter()

const commentSlices = createSlice({
  name: 'comments',
  initialState: commentAdapters.getInitialState({
    status: STATUS_IDLE,
    error: null,
  }),
  reducers: {
    resetStateComments: state => {
      state.status = STATUS_IDLE
      state.error = null
      state.ids = []
      state.entities = {}
    },
    idleStateComments: state => {
      state.status = STATUS_IDLE
    },
    commentAddOne: commentAdapters.addOne,
    commentAddMany: commentAdapters.addMany,
    commentUpdateOne: commentAdapters.updateOne,
    commentUpdateMany: commentAdapters.updateMany,
    commentRemoveOne: commentAdapters.removeOne,
    commentRemoveMany: commentAdapters.removeMany,
  },
  extraReducers: {
    [queryComments.pending]: state => {
      state.status = STATUS_LOADING
    },
    [queryComments.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
  },
})

export const {
  commentAddOne,
  commentAddMany,
  commentUpdateOne,
  commentUpdateMany,
  commentRemoveOne,
  commentRemoveMany,
  idleStateComments,
  resetStateComments,
} = commentSlices.actions

export { queryComments }

export const commentSelectors = commentAdapters.getSelectors(state => state.comments)

export default commentSlices.reducer
