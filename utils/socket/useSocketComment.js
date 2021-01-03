import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryComment } from '../../store/comments/slice'

export function useSocketComment(socket) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (socket) {
      socket.on('COMMENT_UPDATED', id => {
        dispatch(queryComment(id))
      })
    }
  }, [socket])
}
