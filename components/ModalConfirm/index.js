import React from 'react'

import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

import './style.module.scss'

const ModalConfirmIndex = ({ message, onConfirm, onCancel, display }) => {
  function MemorizeConfirmButton() {
    const classNameConfirmButton = 'button-confirm-memorize green-memorize'
    const classNameCancelButton = 'button-confirm-memorize red-memorize'
    return (
      <div className='container-confirm-modal-button-memorize'>
        <Button className={classNameConfirmButton} value='Confirm' onClick={onConfirm} />
        <Button className={classNameCancelButton} value='Cancel' onClick={onCancel} />
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display} className='modal-confirm-memorize'>
        <div className='message-confirm-memorize'>
          {message || 'Message'}
        </div>
        {MemorizeConfirmButton()}
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalConfirmIndex)
