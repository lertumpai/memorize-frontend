import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useContent({ mutateMemorize, actionMemorize, deleteMemorize }) {
  const dispatch = useDispatch()

  const onLike = useCallback((id, action) => {
    dispatch(actionMemorize({ id, action }))
  }, [])

  const onDelete = useCallback(id => {
    dispatch(deleteMemorize(id))
  }, [])

  const onMemorize = useCallback(({ id, content, articleId, setContent }) => {
    dispatch(mutateMemorize({ id, content, articleId }))
    if (setContent) {
      setContent('')
    }
  }, [])

  return {
    onLike,
    onDelete,
    onMemorize,
  }
}
