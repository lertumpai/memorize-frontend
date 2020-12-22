import { gql } from '@apollo/client'

export const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    content
    createdAt
    comment
    author {
      id
      profile {
        name
      }
    }
  }
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
