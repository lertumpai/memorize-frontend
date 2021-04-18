import React from 'react'
import styles from '../styles'

const TextBoxIndex = ({ onChange, value, id, className = '', type = 'text' }) => {
  function TextBox() {
    return <input
      className={className || styles.TextBox.textboxMemorize}
      id={id} type={type}
      value={value}
      onChange={onChange}
    />
  }

  return TextBox()
}

export default React.memo(TextBoxIndex)
