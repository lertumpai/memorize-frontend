import { createAsyncThunk } from '@reduxjs/toolkit'

import { mutation } from '../../utils/graphql-api/client'
import { REGISTER } from './gql'

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await mutation(REGISTER, { username, password })
      return response
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
