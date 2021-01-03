import { io } from 'socket.io-client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SERVER_URL, SERVER_URL_PATH } = publicRuntimeConfig

const socket = process.browser
  ? io(SERVER_URL, {
    path: SERVER_URL_PATH,
    transports: ['websocket', 'polling'],
  })
  : null

export default socket
