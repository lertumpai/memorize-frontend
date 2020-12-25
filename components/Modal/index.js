import React from 'react'

import './style.scss'

const ModalIndex = ({ children, className = '', display = 'hide' }) => {
  function Modal() {
    const classNameCanvas = `modal-canvas-memorize ${display}`
    const classNameModal = `modal-memorize ${className} ${display}`
    const classNameContainerModal = `modal-container-memorize ${display}`
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
