import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddOne, userAddMany } from '../users/slice'
import { commentUpsertMany, commentUpsertOne, commentRemoveOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_COMMENTS, QUERY_COMMENT, MUTATE_COMMENT, MUTATE_COMMENT_ACTION, MUTATE_COMMENT_DELETE } from './gql'

import { prepareResponseComments } from '../../utils/prepareResponse'

export const queryComments = createAsyncThunk(
  'comments/query/comments',
  async ({ articleId, pagination }, { dispatch }) => {
    if (!articleId) return false

    const response = await query(QUERY_COMMENTS, { articleId, pagination })

    const { users, comments } = prepareResponseComments(response)
    dispatch(commentUpsertMany(comments))
    dispatch(userAddMany(users))

    return response
  },
)

export const queryComment = createAsyncThunk(
  'comments/query/comment',
  async (id, { dispatch }) => {
    const response = await query(QUERY_COMMENT, { id })

    const { user, comment } = prepareResponseComments(response)
    dispatch(commentUpsertOne(comment))
    dispatch(userAddOne(user))

    return response
  },
)

export const mutateComment = createAsyncThunk(
  'comments/mutation/comment',
  async ({ id, content, articleId }) => {
    const CommentInput = { content, articleId }
    await mutation(MUTATE_COMMENT, { id, CommentInput })
    return true
  },
)

export const mutateCommentAction = createAsyncThunk(
  'comments/mutation/commentAction',
  async ({ id, action }) => {
    await mutation(MUTATE_COMMENT_ACTION, { id, action })
    return true
  },
)

export const mutateCommentDelete = createAsyncThunk(
  'comments/mutation/commentDelete',
  async id => {
    await mutation(MUTATE_COMMENT_DELETE, { id })
    return true
  },
)
