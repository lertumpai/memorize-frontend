import React from 'react'

import './style.scss'

const InputFileIndex = ({ onChange, value, id, className = '', type = 'file' }) => {
  return <input
    className={className || 'textbox-memorize'}
    id={id}
    type={type}
    value={value}
    onChange={onChange}
  />
}

export default React.memo(InputFileIndex)
