import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { STATUS_IDLE, STATUS_SUCCESS } from '../../store/status'
import { userSelectors } from '../../store/users/slice'
import { articleSelectors, queryArticle } from '../../store/articles/slice'
import { commentSelectors, idleStateComments, queryComments, resetStateComments, mutateComment } from '../../store/comments/slice'

import MemorizeCreateContentBox from '../../components/MemorizeCreateContentBox/dynamic'
import MemorizeContentBox from '../../components/MemorizeContentBox/dynamic'
import Loading from '../../components/Loading/dynamic'
import { MODE_COMMENT, MODE_ARTICLE } from '../../components/MemorizeContentBox/mode'

import './style.scss'

const Index = () => {
  const dispatch = useDispatch()
  const articleId = window.location.pathname.replace('/articles/', '')

  const state = useSelector(state => state)

  const { status } = useSelector(state => state.comments)
  const comments = commentSelectors.selectAll(state)

  const [page, setPage] = useState(1)
  const loader = useRef(null)
  useEffect(() => {
    dispatch(resetStateComments())
    dispatch(queryArticle({ id: articleId }))

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
    const lastComment = comments ? comments[comments.length - 1] : null
    const pagination = {
      before: lastComment?.createdAt,
      limit: 15,
    }
    dispatch(queryComments({ articleId, pagination }))
  }, [page])

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateComments())
    }
  }, [status])

  function CommentContentBoxes() {
    return comments.map(comment => {
      const user = userSelectors.selectById(state, comment.author)
      return <MemorizeContentBox key={comment.id} memorize={comment} user={user} mode={MODE_COMMENT} />
    })
  }

  function ContainerLeftCol() {
    const article = articleSelectors.selectById(state, articleId)
    const user = userSelectors.selectById(state, article?.author)
   return (
     <div className='comment-container-col-memorize'>
       <div className='comment-left-col-memorize'>
         <MemorizeCreateContentBox mutateContent={mutateComment} articleId={articleId} />
         <MemorizeContentBox memorize={article} user={user} mode={MODE_ARTICLE} />
       </div>
     </div>
   )
  }

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
      <>
        <div className='comment-container-memorize'>
          {ContainerLeftCol()}
          {ContainerRightCol()}
        </div>
      </>
    )
  }

  return CommentContainer()
}

export default Index
