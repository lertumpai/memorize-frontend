import { gql } from '@apollo/client'

export const QUERY_COMMENTS = gql`
  query comments($articleId: MID!, $pagination: Pagination) {
    comments(articleId: $articleId, pagination: $pagination) {
      id
      author {
        id
        profile {
          name
        }
      }
      content
      createdAt
    }
  }
`
