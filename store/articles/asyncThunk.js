import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany, userAddOne } from '../users/slice'
import { articleUpsertMany, articleUpsertOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_ARTICLES, QUERY_ARTICLE, MUTATE_ARTICLE, MUTATE_ARTICLE_ACTION, MUTATE_ARTICLE_DELETE } from './gql'

import { prepareResponseArticles } from '../../utils/prepareResponse'

export const queryArticles = createAsyncThunk(
  'articles/query/articles',
  async ({ author, pagination }, { dispatch }) => {
    const response = await query(QUERY_ARTICLES, { author, pagination })

    const { users, articles } = prepareResponseArticles(response)
    dispatch(articleUpsertMany(articles))
    dispatch(userAddMany(users))

    return response
  },
)

export const queryArticle = createAsyncThunk(
  'articles/query/article',
  async (id, { dispatch }) => {
    const response = await query(QUERY_ARTICLE, { id })

    const { user, article } = prepareResponseArticles(response)
    console.log(article)
    dispatch(articleUpsertOne(article))
    dispatch(userAddOne(user))

    return true
  },
)

export const mutateArticle = createAsyncThunk(
  'articles/mutation/article',
  async ({ id, content, image }) => {
    const ArticleInput = { content, image }
    await mutation(MUTATE_ARTICLE, { id, ArticleInput })
    return true
  },
)

export const mutateArticleDelete = createAsyncThunk(
  'articles/mutation/articleDelete',
  async id => {
    await mutation(MUTATE_ARTICLE_DELETE, { id })
    return true
  },
)

export const mutateArticleAction = createAsyncThunk(
  'articles/mutation/articleAction',
  async ({ id, action }) => {
    await mutation(MUTATE_ARTICLE_ACTION, { id, action })
    return true
  },
)
