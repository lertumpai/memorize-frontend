import React from 'react'
import './style.scss'

const ImageIndex = ({ image, className = '' }) => {
  return <img
    src={image}
    className={className || `image-memorize`}
  />
}

export default React.memo(ImageIndex)
