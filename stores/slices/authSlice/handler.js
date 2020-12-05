import {createAsyncThunk} from '@reduxjs/toolkit'

import {post} from '../../httpRequest'

const registerThunk = async ({username, password}, thunkAPI) => {
  const path = 'user/register'
  const body = {username, password}
  return await post(path, {body})
}

const loginThunk = async ({username, password}, thunkAPI) => {
  const path = 'user/login'
  const body = {username, password}
  return await post(path, {body})
}

export const register = createAsyncThunk('auth/register', registerThunk)
export const login = createAsyncThunk('auth/login', loginThunk)