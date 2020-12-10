import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import { articleSelectors } from '../../store/articles/slice'
import { userSelectors } from '../../store/users/slice'
import { queryArticles } from '../../store/articles/asyncThunk'
import ContentArticleBox from '../../components/ContentArticleBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import './style.scss'

const ArticleContainer = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const articles = articleSelectors.selectAll(state)

  const [page, setPage] = useState(1)
  const loader = useRef(null)
  useEffect(() => {
    const options = {
      root: document.querySelector('#application-layout-memorize'),
      rootMargin: '300px',
      threshold: 0.5,
    }
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  // logic load more articles
  useEffect(() => {
    const lastArticle = _.last(articles)
    if (lastArticle) {
      const pagination = { before: lastArticle.createdAt, limit: 15 }
      dispatch(queryArticles({ pagination }))
    }
    else {
      dispatch(queryArticles({}))
    }
  }, [page])

  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage(page => page + 1)
    }
  }

  function ContentArticleBoxes() {
    return articles.map(article => {
      const user = userSelectors.selectById(state, article.author.id)
      return <ContentArticleBox key={article.id} article={article} user={user} />
    })
  }

  return (
    <>
      <div className='article-container-memorize'>
        {ContentArticleBoxes()}
      </div>
      <div ref={loader}>
        <Loading width={300} />
      </div>
    </>
  )
}

export default ArticleContainer
