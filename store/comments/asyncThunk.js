import { createAsyncThunk } from '@reduxjs/toolkit'

import { userUpsertMany, userUpsertOne } from '../users/slice'
import { commentUpsertMany, commentUpsertOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_COMMENTS, MUTATE_COMMENT, MUTATE_COMMENT_ACTION } from './gql'

import { prepareResponseComments } from '../../utils/prepareResponse'

export const queryComments = createAsyncThunk(
  'comments/query/comments',
  async ({ articleId, pagination }, { dispatch }) => {
    const response = await query(QUERY_COMMENTS, { articleId, pagination })

    const { users, comments } = prepareResponseComments(response)
    dispatch(commentUpsertMany(comments))
    dispatch(userUpsertMany(users))

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
    dispatch(userUpsertOne(user))

    return true
  },
)

export const mutateCommentAction = createAsyncThunk(
  'comments/mutation/commentAction',
  async ({ commentId, action }, { dispatch }) => {
    const response = await mutation(MUTATE_COMMENT_ACTION, { commentId, action })

    const { commentAction } = response
    const { comment } = prepareResponseComments({ comment: commentAction })
    dispatch(commentUpsertOne(comment))

    return true
  },
)
