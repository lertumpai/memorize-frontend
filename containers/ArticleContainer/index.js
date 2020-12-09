import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import _ from 'lodash'

import { articleSelectors } from '../../store/articles/slice'
import { queryArticles } from '../../store/articles/asyncThunk'
import ContentBox from '../../components/ContentBox/dynamic'

const ArticleContainer = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const articles = articleSelectors.selectAll(state)

  useEffect(() => {
    dispatch(queryArticles({}))
  }, [articles])

  function ArticleContentBox() {
    return articles.map(article => <ContentBox article={article} />)
  }

  return (
    <Container className='content-box-memorize p-2 p-lg-4'>
      {ArticleContentBox()}
    </Container>
  )
}

export default ArticleContainer
