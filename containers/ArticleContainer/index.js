import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { queryArticles } from '../../store/articles/asyncThunk'

const ArticleContainer = () => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 1) {
      console.log('useEffect article')
      setCount(count + 1)
      dispatch(queryArticles({}))
    }
  }, [count])

  return <div>Article</div>
}

export default ArticleContainer
