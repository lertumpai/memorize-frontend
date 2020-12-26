import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import {
  articleSelectors,
  idleStateArticles,
  queryArticles,
  mutateArticle,
  mutateArticleAction,
  mutateArticleDelete,
} from '../../store/articles/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import { useInfiniteScroll } from '../../utils/hooks/useInfiniteScroll'

import './style.scss'

const ArticleContainerIndex = () => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  const router = useRouter()

  const state = useSelector(state => state)

  const { status } = useSelector(state => state.articles)
  const articles = articleSelectors.selectAll(state)
  const users = userSelectors.selectAll(state)

  const loader = useRef(null)
  useInfiniteScroll({ loader, query: queryArticles, memorizes: articles })

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateArticles())
    }
  }, [status])

  const onComment = useCallback(articleId => {
    return router.push(`/articles/${articleId}`)
  }, [])

  const onLike = useCallback((articleId, action) => {
    dispatch(mutateArticleAction({ articleId, action }))
  }, [])

  const onDeleteMemorize = useCallback(id => {
    dispatch(mutateArticleDelete(id))
  }, [])

  const onEditMemorize = useCallback(({ id, content }) => {
    dispatch(mutateArticle({ id, content }))
  }, [])

  const ArticleContentBoxes = useCallback(() => {
    return articles.map(article => {
      const user = userSelectors.selectById(state, article.author)
      return (
        <div className='container-article-content-box-memorize'>
          <MemorizeContentBox
            key={article.id}
            memorize={article}
            author={user}
            onComment={onComment}
            onLike={onLike}
            onDelete={onDeleteMemorize}
            onEdit={onEditMemorize}
          />
        </div>
      )
    })
  }, [articles, users])

  const onContentChange = useCallback(e => {
    setContent(e.target.value)
  }, [setContent])

  const onMemorize = useCallback(({ id, content }) => {
    const memorize = {
      id,
      content,
    }
    dispatch(mutateArticle(memorize))
    setContent('')
  }, [])

  function ArticleContainer() {
    return (
      <>
        <div className='container-article-memorize'>
          <MemorizeCreateContentBox
            content={content}
            onChange={onContentChange}
            onMemorize={onMemorize}
          />
          {ArticleContentBoxes()}
          <div ref={loader}>
            {status !== STATUS_IDLE ? <Loading width={300} /> : ''}
          </div>
        </div>
      </>
    )
  }

  return ArticleContainer()
}

export default ArticleContainerIndex
