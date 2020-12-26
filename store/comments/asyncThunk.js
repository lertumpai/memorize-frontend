import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddOne, userAddMany } from '../users/slice'
import { commentUpsertMany, commentUpsertOne, commentRemoveOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_COMMENTS, MUTATE_COMMENT, MUTATE_COMMENT_ACTION, MUTATE_COMMENT_DELETE } from './gql'

import { prepareResponseComments } from '../../utils/prepareResponse'

export const queryComments = createAsyncThunk(
  'comments/query/comments',
  async ({ articleId, pagination }, { dispatch }) => {
    const response = await query(QUERY_COMMENTS, { articleId, pagination })

    const { users, comments } = prepareResponseComments(response)
    dispatch(commentUpsertMany(comments))
    dispatch(userAddMany(users))

    return true
  },
)

export const mutateComment = createAsyncThunk(
  'comments/mutation/comment',
  async ({ id, content, articleId }, { dispatch }) => {
    const CommentInput = { content, articleId }
    const response = await mutation(MUTATE_COMMENT, { id, CommentInput })

    const { user, comment } = prepareResponseComments(response)
    dispatch(commentUpsertOne(comment))
    dispatch(userAddOne(user))

    return true
  },
)

export const mutateCommentAction = createAsyncThunk(
  'comments/mutation/commentAction',
  async ({ id, action }, { dispatch }) => {
    const response = await mutation(MUTATE_COMMENT_ACTION, { id, action })

    const { commentAction } = response
    const { comment } = prepareResponseComments({ comment: commentAction })
    dispatch(commentUpsertOne(comment))

    return true
  },
)

export const mutateCommentDelete = createAsyncThunk(
  'comments/mutation/commentDelete',
  async (id, { dispatch }) => {
    await mutation(MUTATE_COMMENT_DELETE, { id })
    dispatch(commentRemoveOne(id))

    return true
  },
)
