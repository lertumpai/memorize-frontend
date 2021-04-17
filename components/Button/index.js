import React from 'react'
import styles from './style.module.scss'

const ButtonIndex = ({ onClick, value, style, className = '' }) => {
  console.log(styles)
  return <div className={styles.buttonMemorize} onClick={onClick} style={style} >{value}</div>
}

export default React.memo(ButtonIndex)
