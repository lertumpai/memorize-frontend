import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import { articleSelectors, queryArticle } from '../../store/articles/slice'
import { commentSelectors, idleStateComments, queryComments, resetStateComments, mutateComment } from '../../store/comments/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'

import './style.scss'

const Index = ({ articleId }) => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  const state = useSelector(state => state)
  const { status } = useSelector(state => state.comments)
  const comments = commentSelectors.selectAll(state)
  const users = userSelectors.selectAll(state)
  const articles = articleSelectors.selectAll(state)

  useMemo(() => {
    if (articleId) {
      dispatch(queryArticle({ id: articleId }))
    }
  }, [articleId])

  const [page, setPage] = useState(1)
  const loader = useRef(null)
  useEffect(() => {
    dispatch(resetStateComments())

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

  const handleObserver = entities => {
    if (entities[0].isIntersecting) {
      setPage(page => page + 1)
    }
  }

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateComments())
    }
  }, [status])


  const onContentChange = useCallback(e => {
    setContent(e.target.value)
  }, [])

  const onMemorize = useCallback(() => {
    const memorize = {
      articleId,
      content,
    }
    dispatch(mutateComment(memorize))
    setContent('')
  }, [content])

  const onArticleLike = useCallback(articleId => {
    console.log(articleId)
  }, [])

  const onComment = useCallback(() => {}, [])

  function ContainerLeftCol() {
    const article = articleSelectors.selectById(state, articleId)
    const user = userSelectors.selectById(state, article?.author)
    return (
      <div className='comment-container-col-memorize'>
        <div className='comment-left-col-memorize'>
          <MemorizeContentBox
            key={article?.id}
            memorize={article}
            author={user}
            onLike={onArticleLike}
            onComment={onComment}
          />
          <MemorizeCreateContentBox value={content} onChange={onContentChange} onMemorize={onMemorize} />
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

  const onCommentLike = useCallback(commentId => {
    console.log(commentId)
  }, [])

  const CommentContentBoxes = useCallback(() => {
    return comments.map(comment => {
      const user = userSelectors.selectById(state, comment.author)
      return <MemorizeContentBox key={comment?.id} memorize={comment} author={user} onLike={onCommentLike}/>
    })
  }, [comments, users])

  function ContainerRightCol() {
    return (
     <div className='comment-container-col-memorize'>
       <div className='comment-right-col-memorize'>
         {CommentContentBoxes()}
         <div ref={loader}>
           {status !== STATUS_IDLE ? <Loading width={300} /> : ''}
         </div>
       </div>
     </div>
    )
  }

  function CommentContainer() {
    return (
      <div className='comment-container-memorize'>
        {ContainerLeftCol()}
        {ContainerRightCol()}
      </div>
    )
  }

  return CommentContainer()
}

export default React.memo(Index)
