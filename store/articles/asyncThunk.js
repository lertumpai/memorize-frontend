import { createAsyncThunk } from '@reduxjs/toolkit'

import { userUpsertMany, userUpsertOne } from '../users/slice'
import { articleUpsertMany, articleUpsertOne, articleRemoveOne } from './slice'

import { query, mutation } from '../../utils/graphql-api/client'
import { QUERY_ARTICLES, QUERY_ARTICLE, MUTATE_ARTICLE, MUTATE_ARTICLE_ACTION, MUTATE_ARTICLE_DELETE } from './gql'

import { prepareResponseArticles } from '../../utils/prepareResponse'

export const queryArticles = createAsyncThunk(
  'articles/query/articles',
  async ({ author, pagination }, { dispatch }) => {
    const response = await query(QUERY_ARTICLES, { author, pagination })

    const { users, articles } = prepareResponseArticles(response)
    dispatch(articleUpsertMany(articles))
    dispatch(userUpsertMany(users))

    return true
  },
)

export const queryArticle = createAsyncThunk(
  'articles/query/article',
  async ({ id }, { dispatch }) => {
    const response = await query(QUERY_ARTICLE, { id })

    const { user, article } = prepareResponseArticles(response)
    dispatch(articleUpsertOne(article))
    dispatch(userUpsertOne(user))

    return true
  },
)

export const mutateArticle = createAsyncThunk(
  'articles/mutation/article',
  async ({ id, content }, { dispatch }) => {
    const ArticleInput = { content }
    const response = await mutation(MUTATE_ARTICLE, { id, ArticleInput })

    const { user, article } = prepareResponseArticles(response)
    dispatch(articleUpsertOne(article))
    dispatch(userUpsertOne(user))

    return true
  },
)

export const mutateArticleDelete = createAsyncThunk(
  'articles/mutation/articleDelete',
  async (id, { dispatch }) => {
    await mutation(MUTATE_ARTICLE_DELETE, { id })
    dispatch(articleRemoveOne(id))
    return true
  },
)

export const mutateArticleAction = createAsyncThunk(
  'articles/mutation/articleAction',
  async ({ articleId, action }, { dispatch }) => {
    const response = await mutation(MUTATE_ARTICLE_ACTION, { articleId, action })

    const { articleAction } = response
    const { article } = prepareResponseArticles({ article: articleAction })
    dispatch(articleUpsertOne(article))

    return true
  },
)
