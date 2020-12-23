import React from 'react'

import MemorizeCreateContentBox from '../MemorizeCreateContentBox/dynamic'
import Modal from '../Modal/dynamic'

import './style.scss'

const ModalMemorizeUpdateContentBoxIndex = ({ id, articleId, content, onChange, onMemorize }) => {
  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal>
        <MemorizeCreateContentBox
          id={id}
          content={content}
          onChange={onChange}
          onMemorize={onMemorize}
        />
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalMemorizeUpdateContentBoxIndex)
