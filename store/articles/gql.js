import { gql } from '@apollo/client'

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
    userAction {
      ...ArticleActionFragment
    }
    author {
      id
      profile {
        name
      }
    }
  }
  ${ArticleActionFragment}
`

export const QUERY_ARTICLES = gql`
  query articles($author: MID, $pagination: Pagination) {
    articles(author: $author, pagination: $pagination) {
      ...ArticleFragment
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

export const MUTATE_ARTICLE_ACTION = gql`
  mutation articleAction($articleId: MID!, $action: ActionEnum!) {
    articleAction(articleId: $articleId, action: $action) {
      ...ArticleFragment
    }
  }
  ${ArticleFragment}
`
