import React from 'react'

import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

import './style.scss'

const ModalConfirmIndex = ({ message, onConfirm, onCancel, display }) => {
  function MemorizeCreateButton() {
    const classNameButton = 'memorize-confirm-button-memorize modal-button-memorize'
    const classNameConfirmButton = classNameButton + ' confirm-button-memorize'
    return (
      <div className='memorize-form-confirm-button-memorize modal-form-memorize'>
        <Button className={classNameConfirmButton} value='Confirm' onClick={onConfirm} />
        <Button className={classNameButton} value='Cancel' onClick={onCancel} />
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display} className='modal-confirm-memorize'>
        <div className='message-confirm-memorize'>
          {message || 'Message'}
        </div>
        {MemorizeCreateButton()}
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalConfirmIndex)
