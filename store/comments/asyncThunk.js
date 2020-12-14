import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany, userAddOne } from '../users/slice'
import { commentAddMany, commentAddOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_COMMENTS } from './gql'

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

// export const mutateArticle = createAsyncThunk(
//   'articles/mutation/article',
//   async ({ id, content }, { dispatch }) => {
//     const ArticleInput = { content }
//     const response = await mutation(MUTATE_ARTICLE, { id, ArticleInput })
//
//     const { user, article } = prepareResponseArticles(response)
//     dispatch(articleAddOne(article))
//     dispatch(userAddOne(user))
//
//     return true
//   },
// )
