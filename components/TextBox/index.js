import React from 'react'
import './style.scss'

const TextBoxIndex = ({ onChange, value, id, className = '', type = 'text' }) => {
  function TextBox() {
    return <input
      className={className || 'textbox-memorize'}
      id={id} type={type}
      value={value}
      onChange={onChange}
    />
  }

  return TextBox()
}

export default React.memo(TextBoxIndex)
