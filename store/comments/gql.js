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

export const MUTATE_COMMENT = gql`
  mutation comment($id: MID, $CommentInput: CommentInput!) {
    comment(id: $id, input: $CommentInput) {
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
