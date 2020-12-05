import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      id
      token
      profile {
          status
          name
          birthday
      }
    }
  }
`
