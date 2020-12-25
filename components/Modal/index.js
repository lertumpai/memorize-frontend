import React from 'react'

import './style.scss'

const ModalIndex = ({ children, className = '', display = 'hide' }) => {
  function Modal() {
    const classNameCanvas = `modal-canvas-memorize ${display}`
    const classNameContainerModal = `container-modal-memorize ${display}`
    const classNameModal = `${className || 'modal-memorize'} ${display}`
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
