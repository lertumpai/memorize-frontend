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
import { useContent } from '../../utils/hooks/useContent'

import './style.module.scss'

const ArticleContainerIndex = () => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  const router = useRouter()

  const state = useSelector(state => state)

  const { status, hasMore } = useSelector(state => state.articles)
  const articles = articleSelectors.selectAll(state)
  const users = userSelectors.selectAll(state)

  const loader = useRef(null)
  useInfiniteScroll({ loader, query: queryArticles, memorizes: articles, status }, {})

  const useContentArticle = useContent({
    mutateMemorize: mutateArticle,
    actionMemorize: mutateArticleAction,
    deleteMemorize: mutateArticleDelete,
  })

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateArticles())
    }
  }, [status])

  const onComment = useCallback(articleId => {
    return router.push(`/articles/${articleId}`)
  }, [])

  const ArticleContentBoxes = useCallback(() => {
    return articles
      .filter(article => article.active)
      .map(article => {
        const user = userSelectors.selectById(state, article.author)
        return (
          <div
            className='container-article-content-box-memorize'
            key={article.id}
          >
            <MemorizeContentBox
              memorize={article}
              author={user}
              onComment={onComment}
              onLike={useContentArticle.onLike}
              onDelete={useContentArticle.onDelete}
              onEdit={useContentArticle.onMemorize}
            />
          </div>
      )
    })
  }, [articles, users])

  const onContentChange = useCallback(e => {
    setContent(e.target.value)
  }, [setContent])

  function HasMoreLoading() {
    return hasMore ?
      (
        <div ref={loader}>
          {status !== STATUS_IDLE ? <Loading width={300} /> : ''}
        </div>
      ) : ''
  }

  function ArticleContainer() {
    return (
      <>
        <div className='container-article-memorize'>
          <MemorizeCreateContentBox
            content={content}
            setContent={setContent}
            onChange={onContentChange}
            onMemorize={useContentArticle.onMemorize}
          />
          {ArticleContentBoxes()}
          {HasMoreLoading()}
        </div>
      </>
    )
  }

  return ArticleContainer()
}

export default ArticleContainerIndex
