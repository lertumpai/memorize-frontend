import React from 'react'
import styles from '../styles'

const ButtonIndex = ({ onClick, value, style, className = '' }) => {
  return <div className={className || styles.Button.buttonMemorize} onClick={onClick} style={style} >{value}</div>
}

export default React.memo(ButtonIndex)
