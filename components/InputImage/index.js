import React from 'react'

import './style.module.scss'

const InputImageIndex = ({ onChange, id }) => {
  return <input
    className='input-image-memorize'
    accept='image/*'
    id={id}
    type='file'
    onChange={onChange}
  />
}

export default React.memo(InputImageIndex)
