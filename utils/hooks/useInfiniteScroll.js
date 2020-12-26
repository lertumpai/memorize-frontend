import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useInfiniteScroll({ loader, query, memorizes }, { articleId }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

  useEffect(() => {
    const options = {
      root: document.querySelector('#application-layout-memorize'),
      rootMargin: '100px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  const handleObserver = useCallback(entities => {
    if (entities[0].isIntersecting) {
      setPage(page => page + 1)
    }
  }, [])

  useEffect(() => {
    const lastMemorize = memorizes ? memorizes[memorizes.length - 1] : null
    const pagination = {
      before: lastMemorize?.createdAt,
      limit: 15,
    }
    dispatch(query({ articleId, pagination }))
  }, [page])
}
