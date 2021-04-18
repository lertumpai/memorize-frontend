import React from 'react'
import styles from '../styles'

import { STATUS_LOADING } from '../../store/status'

const ImageIndex = ({ image, className = '', onClick, status }) => {
  function Image() {
    return (
      <>
        <img
          src={status === STATUS_LOADING ? '/loading/image_loading.gif' : image}
          className={className || styles.Image.imageMemorize}
          onClick={onClick}
        />
      </>
    )
  }

  return Image()
}

export default React.memo(ImageIndex)
