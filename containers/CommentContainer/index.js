import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import {
  articleSelectors,
  queryArticle,
  mutateArticleAction,
  mutateArticleDelete,
  mutateArticle,
  idleStateArticles,
} from '../../store/socket/slice'
import {
  commentSelectors,
  idleStateComments,
  queryComments,
  resetStateComments,
  mutateComment,
  mutateCommentAction,
  mutateCommentDelete,
} from '../../store/comments/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import { useInfiniteScroll } from '../../utils/hooks/useInfiniteScroll'
import { useContent } from '../../utils/hooks/useContent'

import './style.scss'

const CommentContainerIndex = ({ articleId }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [content, setContent] = useState('')

  const state = useSelector(state => state)

  const { status: articleStatus } = useSelector(state => state.articles)
  const { status: commentStatus, hasMore } = useSelector(state => state.comments)
  const comments = commentSelectors.selectAll(state)
  const users = userSelectors.selectAll(state)
  const article = articleSelectors.selectById(state, articleId)

  const useContentArticle = useContent({
    mutateMemorize: mutateArticle,
    actionMemorize: mutateArticleAction,
    deleteMemorize: mutateArticleDelete,
  })

  const useContentComment = useContent({
    mutateMemorize: mutateComment,
    actionMemorize: mutateCommentAction,
    deleteMemorize: mutateCommentDelete,
  })

  useEffect(() => {
    if (articleId) {
      dispatch(queryArticle({ id: articleId }))
    }
  }, [articleId])

  useEffect(() => {
    if (article && !article.active) {
      return router.push('/articles')
    }
  }, [article])

  useEffect(() => {
    return () => dispatch(resetStateComments())
  }, [])

  const loader = useRef(null)
  useInfiniteScroll({ loader, query: queryComments, memorizes: comments, status: commentStatus }, { articleId })

  useEffect(() => {
    if (articleStatus === STATUS_SUCCESS) {
      dispatch(idleStateArticles())
    }
  }, [articleStatus])
  useEffect(() => {
    if (commentStatus === STATUS_SUCCESS) {
      dispatch(idleStateComments())
    }
  }, [commentStatus])

  const onContentChange = useCallback(e => {
    setContent(e.target.value)
  }, [])

  const onComment = useCallback(() => {}, [])

  const ContainerLeftCol = useCallback(() => {
    const user = userSelectors.selectById(state, article?.author)
    return (
      <div className='container-comment-col-memorize'>
        <div className='container-comment-left-col-memorize'>
          <MemorizeContentBox
            key={article?.id}
            memorize={article}
            author={user}
            onComment={onComment}
            onLike={useContentArticle.onLike}
            onDelete={useContentArticle.onDelete}
            onEdit={useContentArticle.onMemorize}
          />
          <MemorizeCreateContentBox
            content={content}
            setContent={setContent}
            articleId={articleId}
            onChange={onContentChange}
            onMemorize={useContentComment.onMemorize}
          />
        </div>
      </div>
    )
  }, [article, users, content])

  const CommentContentBoxes = useCallback(() => {
    return comments.map(comment => {
      const user = userSelectors.selectById(state, comment.author)
      return (
        <div
          className='container-comment-content-box-memorize'
          key={comment?.id}
        >
          <MemorizeContentBox
            memorize={comment}
            author={user}
            onLike={useContentComment.onLike}
            onDelete={useContentComment.onDelete}
            onEdit={useContentComment.onMemorize}
          />
        </div>
      )
    })
  }, [comments, users])

  const HasMoreLoading = useCallback(() => {
    return hasMore
      ? (
        <div ref={loader}>
          {commentStatus !== STATUS_IDLE ? <Loading width={300} /> : ''}
        </div>
      ) : ''
  }, [commentStatus, hasMore])

  const ContainerRightCol = useCallback(() => {
    return (
      <div className='container-comment-col-memorize'>
        <div className='container-comment-right-col-memorize'>
          {CommentContentBoxes()}
          {HasMoreLoading()}
        </div>
      </div>
    )
  }, [commentStatus])

  function CommentContainer() {
    return (
      <div className='container-comment-memorize'>
        {ContainerLeftCol()}
        {ContainerRightCol()}
      </div>
    )
  }

  return CommentContainer()
}

export default React.memo(CommentContainerIndex)
