import React from 'react'

import styles from '../styles'

const ModalIndex = ({ children, className = '', display = styles.Modal.hide }) => {
  function Modal() {
    const classNameCanvas = `${styles.Modal.modalCanvasMemorize} ${display}`
    const classNameContainerModal = `${styles.Modal.containerModalMemorize} ${display}`
    const classNameModal = `${className || styles.Modal.modalMemorize} ${display}`
    return (
      <>
        <div className={classNameCanvas} />
        <div className={classNameContainerModal}>
          <div className={classNameModal}>
            {children}
          </div>
        </div>
      </>
    )
  }

  return Modal()
}

export default React.memo(ModalIndex)
