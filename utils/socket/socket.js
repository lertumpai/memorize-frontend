import { io } from 'socket.io-client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SERVER_URL, SERVER_URL_PATH } = publicRuntimeConfig

const socketIO = () => {
  let socket

  if (!socket) {
    socket = process.browser
      ? io(SERVER_URL, {
        path: SERVER_URL_PATH,
        transports: ['websocket', 'polling'],
      })
      : null
  }

  function open() {
    if (socket && socket.disconnected) {
      socket.connect()
    }
  }

  function close() {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  }

  return { socket, open, close }
}

export default socketIO
