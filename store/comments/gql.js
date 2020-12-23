import { gql } from '@apollo/client'

export const CommentActionFragment = gql`
  fragment CommentActionFragment on CommentAction {
    ... on CommentAction {
      action
      commentId
      authorId
    }
  }
`

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    author {
      id
      profile {
        name
      }
    }
    canMutate
    action
    userAction {
      ...CommentActionFragment
    }
    content
    createdAt
  }
  ${CommentActionFragment}
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

export const MUTATE_COMMENT_ACTION = gql`
  mutation commentAction($commentId: MID!, $action: ActionEnum!) {
    commentAction(commentId: $commentId, action: $action) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`
