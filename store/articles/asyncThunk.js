import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany } from '../users/slice'
import { articleAddMany } from './slice'
import { query } from '../../utils/graphql-api/client'
import { QUERY_ARTICLES } from './gql'
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
