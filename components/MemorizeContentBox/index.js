import React, { useState, useCallback } from 'react'
import moment from 'moment'

import Button from '../Button/dynamic'
import Image from '../Image/dynamic'
import ModalConfirm from '../ModalConfirm/dynamic'
import ModalMemorizeUpdateContentBox from '../ModalMemorizeUpdateContentBox/dynamic'

import './style.scss'

const MemorizeContentBoxIndex = ({ memorize, author, onLike, onComment, onEdit, onDelete }) => {
  const [editContent, setEditContent] = useState('')
  const [editDisplay, setEditDisplay] = useState('hide')
  const [deleteDisplay, setDeleteDisplay] = useState('hide')

  function onClickDelete() {
    setDeleteDisplay('')
  }

  function onClickCancelDelete() {
    setDeleteDisplay('hide')
  }

  function onClickEdit() {
    setEditContent(memorize?.content)
    setEditDisplay('')
  }

  function onClickCancelEdit() {
    setEditDisplay('hide')
  }

  function onClickConfirmDelete() {
    onDelete(memorize.id)
    setDeleteDisplay('hide')
  }

  function onClickComment() {
    onComment(memorize.id)
  }

  function onClickLike() {
    const action = !memorize.userAction ? 'like' : 'unlike'
    onLike(memorize.id, action)
  }

  function onEditContentChange(e) {
    setEditContent(e.target.value)
  }

  function onClickMemorize({ id, content }) {
    onEdit({ id, content })
    setEditDisplay('hide')
  }

  function MemorizeEditDeleteBox() {
    const classNameEdit = 'fa fa-pencil icon-edit-memorize'
    const classNameDelete = 'fa fa-trash-o icon-delete-memorize'
    return (
      <div className='container-edit-delete-box-memorize'>
        <i className={classNameEdit} onClick={onClickEdit} />
        <i className={classNameDelete} onClick={onClickDelete} />
      </div>
    )
  }

  const MemorizeContentBoxHead = useCallback(() => {
    return (
      <div className='container-content-box-head-memorize'>
        <div className='container-content-box-head-left-memorize'>
          <Image
            image={author?.profile?.image || '/avatar.svg'}
            className='image-profile-content-memorize'
          />
        </div>
        <div className='container-content-box-head-right-memorize'>
          <div className='container-content-box-head-profile-name-memorize'>
            <div className='container-profile-name-box-memorize'>
              {author?.profile?.name || 'unknown'}
            </div>
            {memorize?.canMutate ? MemorizeEditDeleteBox() : ''}
          </div>
          <div className='container-content-box-head-createdAt-memorize'>
            {moment(memorize?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </div>
        </div>
      </div>
    )
  }, [author])

  const MemorizeCommentButton = useCallback(() => {
    const classNameButton = 'button-comment-memorize blue-memorize'
    const value = <i className='fa fa-comment-o icon-comment-memorize' count={memorize?.comment || 0} />
    return onComment ? <Button className={classNameButton} onClick={onClickComment} value={value} /> : ''
  }, [memorize?.comment])

  const MemorizeLikeButton = useCallback(() => {
    const action = memorize?.userAction ? memorize?.userAction.action : 'unlike'
    const classNameButton = `button-like-memorize ${action}-memorize`
    const classNameIcon = `fa fa-heart-o icon-like-memorize ${action}`
    const value = <i className={classNameIcon} count={memorize?.action || 0} />
    return <Button className={classNameButton} onClick={onClickLike} value={value} />
  }, [memorize?.action])

  const MemorizeImage = useCallback(() => {
    return (
      <div className='container-content-box-image-memorize'>
        <Image image={memorize?.image} className='image-content-memorize' />
      </div>
    )
  }, [memorize?.image])

  const MemorizeContent = useCallback(() => {
    return (
      <div className='container-content-box-content-memorize'>
        {memorize?.content}
      </div>
    )
  }, [memorize?.content])

  function MemorizeContentBoxBody() {
    return (
      <div className='container-content-box-body-memorize'>
        {MemorizeContent()}
        {MemorizeImage()}
        <hr className='content-box-body-horizontal-memorize' />
        <div className='container-content-box-body-button-memorize'>
          {MemorizeLikeButton()}
          {MemorizeCommentButton()}
        </div>
      </div>
    )
  }

  function MemorizeContentBox() {
    return (
      <>
        <ModalConfirm
          message='Are you sure you want to delete ?'
          display={deleteDisplay}
          onConfirm={onClickConfirmDelete}
          onCancel={onClickCancelDelete}
        />
        <ModalMemorizeUpdateContentBox
          id={memorize?.id}
          display={editDisplay}
          onTextAreaChange={onEditContentChange}
          content={editContent}
          onMemorize={onClickMemorize}
          onCancel={onClickCancelEdit}
        />
        <div className='container-memorize-content-box-memorize'>
          <MemorizeContentBoxHead />
          {MemorizeContentBoxBody()}
        </div>
      </>
    )
  }

  return MemorizeContentBox()
}

export default React.memo(MemorizeContentBoxIndex)
