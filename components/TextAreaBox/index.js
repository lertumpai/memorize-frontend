import React from 'react'

import styles from '../styles'

const TextAreaBoxIndex = ({ onChange, value, id, style, placeholder, className }) => {
  return <textarea
    className={className || styles.TextAreaBox.textareaBoxMemorize}
    id={id}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
}

export default React.memo(TextAreaBoxIndex)
