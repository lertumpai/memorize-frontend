import React from 'react'

import './style.module.scss'

const TextAreaBoxIndex = ({ onChange, value, id, style, placeholder, className }) => {
  return <textarea
    className={className || 'textarea-box-memorize'}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
}

export default React.memo(TextAreaBoxIndex)
