import React from 'react'

import './style.scss'

const InputFileIndex = ({ onChange, id }) => {
  return <input
    className='input-image-memorize'
    accept='image/*'
    id={id}
    type='file'
    onChange={onChange}
  />
}

export default React.memo(InputFileIndex)
