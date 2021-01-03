import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { queryArticle } from '../../store/articles/slice'

export function useSocketArticle(socket) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (socket) {
      socket.on('ARTICLE_UPDATED', id => {
        dispatch(queryArticle(id))
      })
    }
  }, [socket])
}
