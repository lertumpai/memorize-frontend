import { createAsyncThunk } from '@reduxjs/toolkit'

import { mutation, query } from '../../utils/graphql-api/client'
import { REGISTER, LOGIN } from './gql'

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await mutation(REGISTER, { username, password })
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await query(LOGIN, { username, password })
      return response.login
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
