import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import {
  articleSelectors,
  queryArticle,
  mutateArticleAction,
  mutateArticleDelete,
  mutateArticle,
} from '../../store/articles/slice'
import {
  commentSelectors,
  idleStateComments,
  queryComments,
  resetStateComments,
  mutateComment,
  mutateCommentAction,
  mutateCommentDelete,
} from '../../store/comments/slice'
import { idleStateArticles } from '../../store/articles/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import './style.scss'

const CommentContainerIndex = ({ articleId }) => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  const state = useSelector(state => state)
  const { status: articleStatus } = useSelector(state => state.articles)
  const { status: commentStatus } = useSelector(state => state.comments)
  const comments = commentSelectors.selectAll(state)
  const users = userSelectors.selectAll(state)

  useEffect(() => {
    if (articleId) {
      dispatch(queryArticle({ id: articleId }))
    }
  }, [articleId])

  useEffect(() => {
    return () => dispatch(resetStateComments())
  }, [])

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

  const handleObserver = useCallback(entities => {
    if (entities[0].isIntersecting) {
      setPage(page => page + 1)
    }
  }, [])

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

  const onMemorize = useCallback(({ id, articleId, content }) => {
    const memorize = {
      id,
      articleId,
      content,
    }
    dispatch(mutateComment(memorize))
    setContent('')
  }, [])

  const onArticleLike = useCallback((articleId, action) => {
    dispatch(mutateArticleAction({ articleId, action }))
  }, [])

  const onDeleteMemorize = useCallback(id => {
    dispatch(mutateArticleDelete(id))
  }, [])

  const onEditMemorize = useCallback(({ id, content }) => {
    dispatch(mutateArticle({ id, content }))
  }, [])

  const onComment = useCallback(() => {}, [])

  function ContainerLeftCol() {
    const article = articleSelectors.selectById(state, articleId)
    const user = userSelectors.selectById(state, article?.author)
    return (
      <div className='container-comment-col-memorize'>
        <div className='container-comment-left-col-memorize'>
          <MemorizeContentBox
            key={article?.id}
            memorize={article}
            author={user}
            onLike={onArticleLike}
            onComment={onComment}
            onDelete={onDeleteMemorize}
            onEdit={onEditMemorize}
          />
          <MemorizeCreateContentBox
            content={content}
            articleId={articleId}
            onChange={onContentChange}
            onMemorize={onMemorize}
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (articleId) {
      const lastComment = comments ? comments[comments.length - 1] : null
      const pagination = {
        before: lastComment?.createdAt,
        limit: 15,
      }
      dispatch(queryComments({ articleId, pagination }))
    }
  }, [page, articleId])

  const onCommentLike = useCallback((commentId, action) => {
    dispatch(mutateCommentAction({ commentId, action }))
  }, [])

  const onDeleteCommentMemorize = useCallback(id => {
    dispatch(mutateCommentDelete(id))
  }, [])

  const onEditCommentMemorize = useCallback(({ id, content }) => {
    dispatch(mutateComment({ id, content }))
  }, [])

  const CommentContentBoxes = useCallback(() => {
    return comments.map(comment => {
      const user = userSelectors.selectById(state, comment.author)
      return <MemorizeContentBox
        key={comment?.id}
        memorize={comment}
        author={user}
        onLike={onCommentLike}
        onDelete={onDeleteCommentMemorize}
        onEdit={onEditCommentMemorize}
      />
    })
  }, [comments, users])

  function ContainerRightCol() {
    return (
     <div className='container-comment-col-memorize'>
       <div className='container-comment-right-col-memorize'>
         {CommentContentBoxes()}
         <div ref={loader}>
           {commentStatus !== STATUS_IDLE ? <Loading width={300} /> : ''}
         </div>
       </div>
     </div>
    )
  }

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
