import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany, userAddOne } from '../users/slice'
import { commentAddMany, commentAddOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_COMMENTS, MUTATE_COMMENT } from './gql'

import { prepareResponseComments } from '../../utils/prepareResponse'

export const queryComments = createAsyncThunk(
  'comments/query/comments',
  async ({ articleId, pagination }, { dispatch }) => {
    const response = await query(QUERY_COMMENTS, { articleId, pagination })

    const { users, comments } = prepareResponseComments(response)
    dispatch(commentAddMany(comments))
    dispatch(userAddMany(users))

    return true
  },
)

export const mutateComment = createAsyncThunk(
  'articles/mutation/article',
  async ({ id, content, articleId }, { dispatch }) => {
    const CommentInput = { content, articleId }
    const response = await mutation(MUTATE_COMMENT, { id, CommentInput })

    const { user, comment } = prepareResponseComments(response)
    dispatch(commentAddOne(comment))
    dispatch(userAddOne(user))

    return true
  },
)
