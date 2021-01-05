import { gql } from '@apollo/client'

export const UserContentFragment = gql`
  fragment UserContentFragment on User {
    id
    profile {
      name
      image
    }
  }
`
