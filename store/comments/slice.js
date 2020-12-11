import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { STATUS_IDLE } from '../status'

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
export const commentSelectors = commentAdapters.getSelectors(state => state.comments)

export default commentSlices.reducer
