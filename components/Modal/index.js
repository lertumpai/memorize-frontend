import React from 'react'

import './style.scss'

const ModalIndex = ({ children, className = '', display = '' }) => {
  function Modal() {
    const classNameCanvas = `modal-canvas-memorize ${display}`
    const classNameModal = `modal-memorize ${className} ${display}`
    return (
      <>
        <div className={classNameCanvas} />
        <div className={classNameModal}>
          {children}
        </div>
      </>
    )
  }

  return Modal()
}

export default React.memo(ModalIndex)
