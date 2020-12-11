import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany, userAddOne } from '../users/slice'
import { articleAddMany, articleAddOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_ARTICLES, MUTATE_ARTICLE } from './gql'

import prepareResponseArticles from '../../utils/prepareResponse/prepareResponseArticles'

export const queryArticles = createAsyncThunk(
  'articles/query/articles',
  async ({ author, pagination }, { dispatch }) => {
    const response = await query(QUERY_ARTICLES, { author, pagination })

    const { users, articles } = prepareResponseArticles(response)
    dispatch(articleAddMany(articles))
    dispatch(userAddMany(users))

    return true
  },
)

export const mutateArticle = createAsyncThunk(
  'articles/mutation/article',
  async ({ id, content }, { dispatch }) => {
    const input = { content }
    console.log(id, input)
    // const response = await mutation(MUTATE_ARTICLE, { id, input })
  },
)
