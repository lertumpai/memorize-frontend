import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk(
  'auth/register',
  async payload => {
    const { username, register } = payload
  },
)
