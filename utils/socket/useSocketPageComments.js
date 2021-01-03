import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryArticle } from '../../store/articles/slice'
import { queryComment } from '../../store/comments/slice'
import { useSocket } from './useSocket'

export function useSocketPageComments() {
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('ARTICLE_UPDATED', id => {
        dispatch(queryArticle(id))
      })

      socket.on('COMMENT_UPDATED', id => {
        dispatch(queryComment(id))
      })
    }
  }, [socket])
}
