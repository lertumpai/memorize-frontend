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
