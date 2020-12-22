import { gql } from '@apollo/client'

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
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
`

export const QUERY_COMMENTS = gql`
  query comments($articleId: MID!, $pagination: Pagination) {
    comments(articleId: $articleId, pagination: $pagination) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`

export const MUTATE_COMMENT = gql`
  mutation comment($id: MID, $CommentInput: CommentInput!) {
    comment(id: $id, input: $CommentInput) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`
