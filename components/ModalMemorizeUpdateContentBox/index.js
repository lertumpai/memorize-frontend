import React from 'react'

import TextAreaBox from '../TextAreaBox/dynamic'
import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

import styles from '../styles'

const ModalMemorizeUpdateContentBoxIndex = ({ id, content, onTextAreaChange, onMemorize, onCancel, display }) => {
  function onClickMemorize() {
    onMemorize({ id, content })
  }

  function MemorizeButton() {
    const classNameCancelButton = `${styles.Button.buttonConfirmMemorize} red-memorize`
    const color = content ? 'green-memorize' : 'disable-memorize'
    const classNameMemorizeButton = `${styles.Button.buttonConfirmMemorize} ${color}`
    return (
      <div className={styles.ModalMemorizeUpdateContentBox.containerModalUpdateFormButtonMemorize} >
        <div className={styles.ModalMemorizeUpdateContentBox.containerModalUpdateButtonMemorize} >
          <Button onClick={onClickMemorize} className={classNameMemorizeButton} value='Memorize' />
        </div>
        <div className={styles.ModalMemorizeUpdateContentBox.containerModalUpdateButtonMemorize} >
          <Button onClick={onCancel} className={classNameCancelButton} value='Cancel' />
        </div>
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display}>
        <TextAreaBox
          className={styles.TextAreaBox.textareaContentBoxMemorize}
          id='TextAreaBox'
          value={content}
          onChange={onTextAreaChange}
        />
        {MemorizeButton()}
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalMemorizeUpdateContentBoxIndex)
