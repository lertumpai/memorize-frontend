import React from 'react'
import moment from 'moment'

import Button from '../Button/dynamic'

import './style.scss'

const MemorizeContentBoxIndex = ({ memorize, author, onLike, onComment }) => {
  function onClickComment() {
    onComment(memorize.id)
  }

  function onClickLike() {
    const action = !memorize.userAction ? 'like' : 'unlike'
    onLike(memorize.id, action)
  }

  function MemorizeContentBoxHead() {
    return (
      <div className='memorize-content-box-head-memorize'>
        <div className='memorize-profile-name-memorize'>
          {author?.profile?.name || 'unknown'}
        </div>
        <div className='memorize-createdAt-memorize'>
          {moment(memorize?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
        </div>
      </div>
    )
  }

  function MemorizeCommentButton() {
    const classNameButton = 'memorize-button-comment-memorize'
    const value = <i className='fa fa-comment-o memorize-comment-icon-memorize' count={memorize?.comment || 0} />
    return onComment ? <Button className={classNameButton} onClick={onClickComment} value={value} /> : ''
  }

  function MemorizeLikeButton() {
    const action = memorize?.userAction ? memorize?.userAction.action : 'unlike'
    const classNameButton = `memorize-button-like-memorize ${action}`
    const classNameIcon = `fa fa-heart-o memorize-like-icon-memorize ${action}`
    const value = <i className={classNameIcon} count={memorize?.action || 0} />
    return <Button className={classNameButton} onClick={onClickLike} value={value} />
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

  function MemorizeContentBox() {
    return (
      <div className='memorize-content-box-memorize'>
        <MemorizeContentBoxHead />
        <MemorizeContentBoxBody />
      </div>
    )
  }

  return <MemorizeContentBox />
}

export default React.memo(MemorizeContentBoxIndex)
