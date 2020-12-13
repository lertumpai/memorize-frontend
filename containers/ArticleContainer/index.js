import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import { articleSelectors, idleStateArticles, queryArticles, mutateArticle } from '../../store/articles/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'
import { MODE_ARTICLE } from '../../components/MemorizeContentBox/mode'

import './style.scss'

const Index = () => {
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
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage(page => page + 1)
    }
  }

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
  }, [status])

  function ArticleContentBoxes() {
    return articles.map(article => {
      const user = userSelectors.selectById(state, article.author)
      return <MemorizeContentBox key={article.id} memorize={article} user={user} mode={MODE_ARTICLE} />
    })
  }

  function ArticleContainer() {
    return (
      <div className='article-container-memorize'>
        <MemorizeCreateContentBox mutateContent={mutateArticle} />
        {ArticleContentBoxes()}
        <div ref={loader}>
          <Loading width={300} />
        </div>
      </div>
    )
  }

  return <ArticleContainer />
}

export default Index
