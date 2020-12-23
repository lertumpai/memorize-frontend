import React from 'react'
import './style.scss'

const ModalIndex = ({ children, className }) => {
  return (
    <>
      <div className='modal-canvas-memorize' />
      <div className={className || 'modal-memorize'}>
        {children}
      </div>
    </>
  )
}

export default React.memo(ModalIndex)
