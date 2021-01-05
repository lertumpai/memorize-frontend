import { gql } from '@apollo/client'

import { UserContentFragment } from '../users/gql'

export const ArticleActionFragment = gql`
  fragment ArticleActionFragment on ArticleAction {
    ... on ArticleAction {
      action
      articleId
      authorId
    }
  }
`

export const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    content
    createdAt
    comment
    canMutate
    action
    active
    userAction {
      ...ArticleActionFragment
    }
    author {
      ...UserContentFragment
    }
  }
  ${ArticleActionFragment}
  ${UserContentFragment}
`

export const QUERY_ARTICLES = gql`
  query articles($author: MID, $pagination: Pagination) {
    articles(author: $author, pagination: $pagination) {
      data {
        ...ArticleFragment
      }
      hasMore
    }
  }
  ${ArticleFragment}
`

export const QUERY_ARTICLE = gql`
  query article($id: MID!) {
    article(id: $id) {
      ...ArticleFragment
    }
  }
  ${ArticleFragment}
`

export const MUTATE_ARTICLE = gql`
  mutation article($id: MID, $ArticleInput: ArticleInput!) {
    article(id: $id, input: $ArticleInput) {
      ...ArticleFragment
    }
  }
  ${ArticleFragment}
`

export const MUTATE_ARTICLE_DELETE = gql`
  mutation articleDelete($id: MID!) {
    articleDelete(id: $id) {
      ...ArticleFragment
    }
  }
  ${ArticleFragment}
`

export const MUTATE_ARTICLE_ACTION = gql`
  mutation articleAction($id: MID!, $action: ActionEnum!) {
    articleAction(id: $id, action: $action) {
      ...ArticleFragment
    }
  }
  ${ArticleFragment}
`
