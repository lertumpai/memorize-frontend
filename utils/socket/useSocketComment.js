import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryComment } from '../../store/comments/slice'
import { useSocket } from './useSocket'

export function useSocketComment() {
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('COMMENT_UPDATED', id => {
        dispatch(queryComment(id))
      })
    }
  }, [socket])
}
