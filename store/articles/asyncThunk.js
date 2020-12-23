import { createAsyncThunk } from '@reduxjs/toolkit'

import { userAddMany, userAddOne } from '../users/slice'
import { articleAddMany, articleAddOne, articleUpdateOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_ARTICLES, QUERY_ARTICLE, MUTATE_ARTICLE, MUTATE_ARTICLE_ACTION } from './gql'

import { prepareResponseArticles } from '../../utils/prepareResponse'

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

export const queryArticle = createAsyncThunk(
  'articles/query/article',
  async ({ id }, { dispatch }) => {
    const response = await query(QUERY_ARTICLE, { id })

    const { user, article } = prepareResponseArticles(response)
    dispatch(articleAddOne(article))
    dispatch(userAddOne(user))

    return true
  },
)

export const mutateArticle = createAsyncThunk(
  'articles/mutation/article',
  async ({ id, content }, { dispatch }) => {
    const ArticleInput = { content }
    const response = await mutation(MUTATE_ARTICLE, { id, ArticleInput })

    const { user, article } = prepareResponseArticles(response)
    dispatch(articleAddOne(article))
    dispatch(userAddOne(user))

    return true
  },
)

export const mutateArticleAction = createAsyncThunk(
  'articles/mutation/articleAction',
  async ({ articleId, action }, { dispatch }) => {
    const response = await mutation(MUTATE_ARTICLE_ACTION, { articleId, action })

    const { articleAction } = response
    dispatch(articleUpdateOne({ id: articleId, changes: { userAction: articleAction } }))

    return true
  },
)
