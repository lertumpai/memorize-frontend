import { useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SERVER_URL, SERVER_URL_PATH } = publicRuntimeConfig

export function useSocket() {
  let socket = useMemo(() => {
    return process.browser
      ? io(SERVER_URL, {
        path: SERVER_URL_PATH,
        transports: ['websocket', 'polling'],
        autoConnect: false,
      })
      : null
  }, [])

  useEffect(() => {
    socket.open()
    return () => {
      socket.close()
      socket = null
    }
  }, [])

  return socket
}
