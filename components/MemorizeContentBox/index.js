import React, { useState, useCallback } from 'react'
import moment from 'moment'

import Button from '../Button/dynamic'
import Image from '../Image/dynamic'
import ModalConfirm from '../ModalConfirm/dynamic'
import ModalMemorizeUpdateContentBox from '../ModalMemorizeUpdateContentBox/dynamic'

import styles from '../styles'

const MemorizeContentBoxIndex = ({ memorize, author, onLike, onComment, onEdit, onDelete }) => {
  const [editContent, setEditContent] = useState('')
  const [editDisplay, setEditDisplay] = useState(styles.Modal.hide)
  const [deleteDisplay, setDeleteDisplay] = useState(styles.Modal.hide)

  function onClickDelete() {
    setDeleteDisplay('')
  }

  function onClickCancelDelete() {
    setDeleteDisplay(styles.Modal.hide)
  }

  function onClickEdit() {
    setEditContent(memorize?.content)
    setEditDisplay('')
  }

  function onClickCancelEdit() {
    setEditDisplay(styles.Modal.hide)
  }

  function onClickConfirmDelete() {
    onDelete(memorize.id)
    setDeleteDisplay(styles.Modal.hide)
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
    setEditDisplay(styles.Modal.hide)
  }

  function MemorizeEditDeleteBox() {
    const classNameEdit = `fa fa-pencil ${styles.MemorizeContentBox.iconEditMemorize}`
    const classNameDelete = `fa fa-trash-o ${styles.MemorizeContentBox.iconDeleteMemorize}`
    return (
      <div className={styles.MemorizeContentBox.containerEditDeleteBoxMemorize}>
        <i className={classNameEdit} onClick={onClickEdit} />
        <i className={classNameDelete} onClick={onClickDelete} />
      </div>
    )
  }

  const MemorizeProfileImage = useCallback(() => {
    return (
      <div className={styles.MemorizeContentBox.containerContentBoxHeadLeftMemorize}>
        <Image
          image={author?.profile?.image || '/avatar.svg'}
          className={styles.Image.imageProfileContentMemorize}
        />
      </div>
    )
  }, [author?.profile?.image])

  function MemorizeContentBoxHead() {
    return (
      <div className={styles.MemorizeContentBox.containerContentBoxHeadMemorize}>
        {MemorizeProfileImage()}
        <div className={styles.MemorizeContentBox.containerContentBoxHeadRightMemorize}>
          <div className={styles.MemorizeContentBox.containerContentBoxHeadProfileNameMemorize}>
            <div className={styles.MemorizeContentBox.containerProfileNameBoxMemorize}>
              {author?.profile?.name || 'unknown'}
            </div>
            {memorize?.canMutate ? MemorizeEditDeleteBox() : ''}
          </div>
          <div className={styles.MemorizeContentBox.containerContentBoxHeadCreatedAtMemorize}>
            {moment(memorize?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </div>
        </div>
      </div>
    )
  }

  const MemorizeCommentButton = useCallback(() => {
    const classNameButton = `${styles.Button.buttonCommentMemorize} blue-memorize`
    const value = <i className={`fa fa-comment-o ${styles.MemorizeContentBox.iconCommentMemorize}`} count={memorize?.comment || 0} />
    return onComment ? <Button className={classNameButton} onClick={onClickComment} value={value} /> : ''
  }, [memorize?.comment])

  const MemorizeLikeButton = useCallback(() => {
    let actionButtonStyle
    let actionIconStyle
    switch (memorize?.userAction?.action) {
      case 'like': {
        actionButtonStyle = styles.Button.like
        break
      }

      case 'unlike': {
        actionButtonStyle = styles.Button.like
        actionIconStyle = styles.MemorizeContentBox.unlike
        break
      }

      default: {
        actionButtonStyle = styles.Button.unlike
        actionIconStyle = styles.MemorizeContentBox.unlike
        break
      }
    }

    const classNameButton = `${styles.Button.buttonLikeMemorize} ${actionButtonStyle}`
    const classNameIcon = `fa fa-heart-o ${styles.MemorizeContentBox.iconLikeMemorize} ${actionIconStyle}`
    const value = <i className={classNameIcon} count={memorize?.action || 0} />
    return <Button className={classNameButton} onClick={onClickLike} value={value} />
  }, [memorize?.action])

  const MemorizeImage = useCallback(() => {
    return (
      <div className={styles.MemorizeContentBox.containerContentBoxImageMemorize}>
        <Image image={memorize?.image} className={styles.Image.imageContentMemorize} />
      </div>
    )
  }, [memorize?.image])

  const MemorizeContent = useCallback(() => {
    return (
      <div className={styles.MemorizeContentBox.containerContentBoxContentMemorize}>
        {memorize?.content}
      </div>
    )
  }, [memorize?.content])

  function MemorizeContentBoxBody() {
    return (
      <div className={styles.MemorizeContentBox.containerContentBoxBodyMemorize}>
        {MemorizeContent()}
        {MemorizeImage()}
        <hr className={styles.MemorizeContentBox.contentBoxBodyHorizontalMemorize} />
        <div className={styles.MemorizeContentBox.containerContentBoxBodyButtonMemorize}>
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
        <div className={styles.MemorizeContentBox.containerMemorizeContentBoxMemorize}>
          {MemorizeContentBoxHead()}
          {MemorizeContentBoxBody()}
        </div>
      </>
    )
  }

  return MemorizeContentBox()
}

export default React.memo(MemorizeContentBoxIndex)
