import { gql } from '@apollo/client'

export const QUERY_ARTICLES = gql`
  query articles($author: MID, $pagination: Pagination) {
    articles(author: $author, pagination: $pagination) {
      id
      content
      createdAt
      author {
        id
        profile {
          name
        }
      }
    }
  }
`

export const MUTATE_ARTICLE = gql`
  mutation article($id: MID, $ArticleInput: ArticleInput!) {
    article(id: $id, input: $ArticleInput) {
      id
      content
      createdAt
      author {
        id
        profile {
          name
        }
      }
    }
  }
`
