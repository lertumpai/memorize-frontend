import React from 'react'
import './style.scss'

const ImageIndex = ({ image, className = '', onClick }) => {
  return <img
    src={image}
    className={className || `image-memorize`}
    onClick={onClick}
  />
}

export default React.memo(ImageIndex)
