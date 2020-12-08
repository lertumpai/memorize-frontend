import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import { articleSelectors } from '../../store/articles/slice'
import { userSelectors } from '../../store/users/slice'
import { queryArticles } from '../../store/articles/asyncThunk'

const ArticleContainer = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const articles = articleSelectors.selectAll(state)

  useEffect(() => {
    dispatch(queryArticles({}))
  }, [articles])

  return <div>articles</div>
}

export default ArticleContainer
