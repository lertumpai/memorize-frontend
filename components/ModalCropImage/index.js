import React from 'react'

import Modal from '../Modal/dynamic'
import CropImage from '../CropImage/dynamic'

import styles from '../styles'

const ModalCropImageIndex = ({ onSubmit, onCancel, display }) => {
  function ModalCropImage() {
    return (
      <Modal display={display} className={styles.Modal.modalCropImageMemorize}>
        <CropImage onSubmit={onSubmit} onCancel={onCancel} />
      </Modal>
    )
  }

  return ModalCropImage()
}

export default React.memo(ModalCropImageIndex)
