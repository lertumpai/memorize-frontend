import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import { MODE_ARTICLE } from './mode'
import './style.scss'

const ContentArticleBox = ({ memorize, user, mode }) => {
  function MemorizeContentBoxHead() {
    return (
      <div className='memorize-content-box-head-memorize'>
        <div className='memorize-profile-name-memorize'>
          {user?.profile?.name || 'unknown'}
        </div>
        <div className='memorize-createdAt-memorize'>
          {moment(memorize?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
        </div>
      </div>
    )
  }

  function MemorizeCommentButton() {
    const articleId = memorize?.id || window.location.pathname.replace('/articles/', '')
    const href = `/articles/${articleId}`
    const commentButton = mode === MODE_ARTICLE
      ? (
        <Link href={href}>
          <div className='memorize-button-comment-memorize'>
            <i className='fa fa-comment-o memorize-comment-icon-memorize' count={memorize?.comment || 0} />
          </div>
        </Link>
      ) : ''
    return commentButton
  }

  function MemorizeLikeButton() {
    return (
      <div className='memorize-button-like-memorize'>
        <i className='fa fa-heart-o memorize-like-icon-memorize' count={memorize?.comment || 0} />
      </div>
    )
  }

  function MemorizeContentBoxBody() {

    return (
      <div className='memorize-container-content-box-body-memorize'>
        <div className='memorize-content-box-body-memorize'>
          {memorize?.content}
        </div>
        <hr className='memorize-horizontal-memorize' />
        <div className='memorize-container-button-box-body-memorize'>
          {MemorizeLikeButton()}
          {MemorizeCommentButton()}
        </div>
      </div>
    )
  }

  function ContentBox() {
    return (
      <div className='memorize-content-box-memorize'>
        <MemorizeContentBoxHead />
        <MemorizeContentBoxBody />
      </div>
    )
  }

  return <ContentBox />
}

export default ContentArticleBox
