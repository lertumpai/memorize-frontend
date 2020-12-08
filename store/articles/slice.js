import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { queryArticles } from './asyncThunk'
import { STATUS_LOADING, STATUS_SUCCESS, STATUS_IDLE } from '../status'

const articleAdapters = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt > b.createdAt,
})

const articleSlices = createSlice({
  name: 'articles',
  initialState: articleAdapters.getInitialState({
    status: STATUS_IDLE,
    error: null,
  }),
  reducers: {
    idleStateArticles: state => {
      state.status = STATUS_IDLE
    },
    articleAddOne: articleAdapters.addOne,
    articleAddMany: articleAdapters.addMany,
    articleUpdateOne: articleAdapters.updateOne,
    articleUpdateMany: articleAdapters.updateMany,
    articleRemoveOne: articleAdapters.removeOne,
    articleRemoveMany: articleAdapters.removeMany,
  },
  extraReducers: {
    [queryArticles.pending]: state => {
      state.status = STATUS_LOADING
    },
    [queryArticles.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
  },
})

export const { articleAddOne, articleAddMany, articleUpdateOne, articleUpdateMany, articleRemoveOne, articleRemoveMany } = articleSlices.actions
export const articleSelectors = articleAdapters.getSelectors(state => state.articles)

export default articleSlices.reducer
