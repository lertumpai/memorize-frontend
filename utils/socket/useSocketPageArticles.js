import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryArticle } from '../../store/articles/slice'
import socket from './'

export function useSocketPageArticles() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (socket) {
      socket.on('ARTICLE_UPDATED', id => {
        dispatch(queryArticle(id))
      })
    }
  }, [socket])
}
