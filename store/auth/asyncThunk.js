import { createAsyncThunk } from '@reduxjs/toolkit'
import { useMutation } from '@apollo/client'

import { error } from '../../utils/graphql-api/error'

import { REGISTER } from './gql'

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }) => {
    const [user] = useMutation(REGISTER)
    try {
      const registered = await user({ variables: { username, password } })
    } catch (e) {
      error(e.graphQLErrors)
    }
  },
)
