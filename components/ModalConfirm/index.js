import React from 'react'

import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

import styles from '../styles'

const ModalConfirmIndex = ({ message, onConfirm, onCancel, display }) => {
  function MemorizeConfirmButton() {
    const classNameConfirmButton = `${styles.Button.buttonConfirmMemorize} green-memorize`
    const classNameCancelButton = `${styles.Button.buttonConfirmMemorize} red-memorize`
    return (
      <div className={styles.ModalConfirm.containerConfirmModalButtonMemorize}>
        <Button className={classNameConfirmButton} value='Confirm' onClick={onConfirm} />
        <Button className={classNameCancelButton} value='Cancel' onClick={onCancel} />
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display} className={styles.Modal.modalConfirmMemorize}>
        <div className={styles.ModalConfirm.messageConfirmMemorize}>
          {message || 'Message'}
        </div>
        {MemorizeConfirmButton()}
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalConfirmIndex)
