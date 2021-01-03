import { useEffect } from 'react'

import socketIO from './socket'

export function useSocket() {
  const socket = socketIO()

  useEffect(() => {
    socket.open()
    return () => socket.close()
  }, [])

  return socket.socket
}
