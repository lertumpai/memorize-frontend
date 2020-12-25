import React from 'react'

import TextAreaBox from '../TextAreaBox/dynamic'
import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

import './style.scss'

const ModalMemorizeUpdateContentBoxIndex = ({ id, content, onTextAreaChange, onMemorize, onCancel, display }) => {
  function onClickMemorize() {
    onMemorize({ id, content })
  }

  function MemorizeButton() {
    const classNameCancelButton = 'button-confirm-memorize red-memorize'
    const color = content ? 'green-memorize' : 'disable-memorize'
    const classNameMemorizeButton = `button-confirm-memorize ${color}`
    return (
      <div className='container-modal-update-form-button-memorize'>
        <div className='container-modal-update-button-memorize'>
          <Button onClick={onClickMemorize} className={classNameMemorizeButton} value='Memorize' />
        </div>
        <div className='container-modal-update-button-memorize'>
          <Button onClick={onCancel} className={classNameCancelButton} value='Cancel' />
        </div>
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display}>
        <TextAreaBox
          className='textarea-content-box-memorize'
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
