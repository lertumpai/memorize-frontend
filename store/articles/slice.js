import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { queryArticles, queryArticle, mutateArticle, mutateArticleAction } from './asyncThunk'
import { STATUS_LOADING, STATUS_SUCCESS, STATUS_IDLE } from '../status'

const articleAdapters = createEntityAdapter({
  sortComparer: (a, b) => {
    const valueA = new Date(a.createdAt).valueOf()
    const valueB = new Date(b.createdAt).valueOf()
    return valueB - valueA
  },
})

const articleSlices = createSlice({
  name: 'articles',
  initialState: articleAdapters.getInitialState({
    status: STATUS_IDLE,
    error: null,
  }),
  reducers: {
    resetStateArticles: state => {
      state.status = STATUS_IDLE
      state.error = null
      state.ids = []
      state.entities = {}
    },
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
    [queryArticle.pending]: state => {
      state.status = STATUS_LOADING
    },
    [queryArticle.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [mutateArticle.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutateArticle.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [mutateArticleAction.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutateArticleAction.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
  },
})

export const {
  articleAddOne,
  articleAddMany,
  articleUpdateOne,
  articleUpdateMany,
  articleRemoveOne,
  articleRemoveMany,
  resetStateArticles,
  idleStateArticles,
} = articleSlices.actions

export { queryArticles, queryArticle, mutateArticle, mutateArticleAction }

export const articleSelectors = articleAdapters.getSelectors(state => state.articles)

export default articleSlices.reducer
