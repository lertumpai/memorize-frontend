import React from 'react'

import './style.scss'

const Index = ({ onChange, value, id, style, placeholder, className }) => {
  return <textarea
    className={className || 'text-area-box-memorize'}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
}

export default React.memo(Index)
