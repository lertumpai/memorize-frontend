import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { articleSelectors, idleStateArticles } from '../../store/articles/slice'
import { userSelectors } from '../../store/users/slice'
import { queryArticles } from '../../store/articles/asyncThunk'

import ArticleCreateContentBox from '../../components/ArticleCreateContentBox/dynamic'
import ArticleContentBox from '../../components/ArticleContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import './style.scss'

const ArticleContainer = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)

  const { status } = useSelector(state => state.articles)
  const articles = articleSelectors.selectAll(state)

  const [page, setPage] = useState(1)
  const loader = useRef(null)
  useEffect(() => {
    const options = {
      root: document.querySelector('#application-layout-memorize'),
      rootMargin: '100px',
      threshold: 0.5,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  useEffect(() => {
    const lastArticle = articles ? articles[articles.length - 1] : null
    const pagination = {
      before: lastArticle?.createdAt,
      limit: 15,
    }
    dispatch(queryArticles({ pagination }))
  }, [page])

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateArticles())
    }
  })

  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage(page => page + 1)
    }
  }

  function ArticleContentBoxes() {
    return articles.map(article => {
      const user = userSelectors.selectById(state, article.author)
      return <ArticleContentBox key={article.id} article={article} user={user} />
    })
  }

  return (
    <>
      <div className='article-container-memorize'>
        <ArticleCreateContentBox />
        {ArticleContentBoxes()}
        <div ref={loader}>
          {status !== STATUS_IDLE ? <Loading width={300} /> : ''}
        </div>
      </div>
    </>
  )
}

export default ArticleContainer
