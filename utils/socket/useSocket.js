import { useEffect } from 'react'

import socket from './'

export function useSocket() {
  useEffect(() => {
    socket.open()

    return () => socket.close()
  }, [])

  return socket.socket
}
