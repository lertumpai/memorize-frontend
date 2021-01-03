import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryArticle } from '../../store/articles/asyncThunk'
import { useSocket } from './useSocket'

export function useSocketPageArticles() {
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('ARTICLE_UPDATED', id => {
        dispatch(queryArticle(id))
      })
    }
  }, [socket])
}
