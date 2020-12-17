import React from 'react'
import moment from 'moment'
import Link from 'next/link'

import { MODE_LIKE, MODE_COMMENT } from '../Button'
import Button from '../Button/dynamic'

import './style.scss'

const Index = ({ memorize, user, onLike, onComment }) => {
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
    return onComment ? <Button mode={MODE_COMMENT} onClick={onComment} value='Comment' /> : ''
  }

  function MemorizeLikeButton() {
    return <Button mode={MODE_LIKE} onClick={onLike} value='Like' />
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

export default Index
