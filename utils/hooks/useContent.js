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

  const onMemorize = useCallback(({ id, content, image, articleId, setContent, setTempImage }) => {
    if (mutateMemorize) {
      dispatch(mutateMemorize({ id, content, image, articleId }))
      if (setContent) setContent('')
      if (setTempImage) setTempImage('')
    }
  }, [])

  return {
    onLike,
    onDelete,
    onMemorize,
  }
}
