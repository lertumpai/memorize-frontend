import React from 'react'

import './style.scss'

const Index = ({ onChange, value, id, style, placeholder }) => {
  return <textarea
    className='text-area-box-memorize'
    id={id}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
}

export default Index
