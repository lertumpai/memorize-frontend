import { io } from 'socket.io-client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SERVER_URL } = publicRuntimeConfig

const socketIo = process.browser
  ? io('http://192.168.1.106:5000', {
    path: '/graphql',
    transports: ['websocket', 'polling'],
    autoConnect: false,
  })
  : null

const open = () => socketIo ? socketIo.open() : null
const close = () => socketIo ? socketIo.close() : null

export default {
  socket: socketIo,
  open,
  close,
}
