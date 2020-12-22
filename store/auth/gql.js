import { gql } from '@apollo/client'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    token
    profile {
      status
      name
      birthday
    }
  }
`

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

export const SAVE_PROFILE = gql`
  mutation profile($id: MID!, $input: ProfileInput) {
    profile(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${UserFragment}
`
