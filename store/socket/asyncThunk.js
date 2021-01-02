import { createAsyncThunk } from '@reduxjs/toolkit'

export const onArticleCreated = createAsyncThunk(
  'socket/articleCreated',
  async (_, { dispatch, getState }) => {
    const { socket: { socket } } = getState()
    socket.on('ARTICLE_CREATE', args => {
      console.log(args)
    })
  },
)
