import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryArticle } from '../../store/articles/asyncThunk'
import { queryComment } from '../../store/comments/asyncThunk'
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
