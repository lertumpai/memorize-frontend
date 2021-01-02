import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import { onArticleCreated } from './asyncThunk'
import { SOCKET_CONNECTED, SOCKET_DISCONNECTED, STATUS_IDLE, SOCKET_ON_ARTICLE_CREATED } from '../status'

const initialState = {
  status: SOCKET_DISCONNECTED,
  eventStatus: STATUS_IDLE,
  error: null,
  socket: null,
}

const socketSlices = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: state => {
      state.status = SOCKET_CONNECTED
      state.socket = io('http://localhost:5000', { path: '/graphql', transports: ['websocket', 'polling'] })
    },
    disconnectSocket: state => {
      state.status = SOCKET_DISCONNECTED
      state.socket = null
    },
  },
  extraReducers: {
    [onArticleCreated.fulfilled]: state => {
      state.eventStatus = SOCKET_ON_ARTICLE_CREATED
    },
  },
})

export const {
  connectSocket,
  disconnectSocket,
} = socketSlices.actions

export { onArticleCreated }

export default socketSlices.reducer
