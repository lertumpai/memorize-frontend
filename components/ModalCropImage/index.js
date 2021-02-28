import React from 'react'

import Modal from '../Modal/dynamic'
import CropImage from '../CropImage/dynamic'

import './style.scss'

const ModalCropImageIndex = ({ onSubmit, onCancel, display }) => {
  function ModalCropImage() {
    return (
      <Modal display={display} className='modal-crop-image-memorize'>
        <CropImage onSubmit={onSubmit} onCancel={onCancel} />
      </Modal>
    )
  }

  return ModalCropImage()
}

export default React.memo(ModalCropImageIndex)
