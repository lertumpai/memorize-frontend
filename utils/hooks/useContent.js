import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useContent({ mutateMemorize, actionMemorize, deleteMemorize }) {
  const dispatch = useDispatch()

  const onLike = useCallback((id, action) => {
    if (actionMemorize) {
      dispatch(actionMemorize({ id, action }))
    }
  }, [])

  const onDelete = useCallback(id => {
    if (deleteMemorize) {
      dispatch(deleteMemorize(id))
    }
  }, [])

  const onMemorize = useCallback(({ id, content, articleId, setContent }) => {
    if (mutateMemorize) {
      dispatch(mutateMemorize({ id, content, articleId }))
      if (setContent) setContent('')
    }
  }, [])

  return {
    onLike,
    onDelete,
    onMemorize,
  }
}
