import React from 'react'
import './style.scss'

export const MODE_SUBMIT = 'submit'
export const MODE_DISABLE = 'disable'
export const MODE_AUTHENTICATION = 'authentication'
export const MODE_LIKE = 'like'
export const MODE_COMMENT = 'comment'

const Index = ({ onClick, mode = MODE_SUBMIT, value, style }) => {
  return <div className={`button-${mode}-memorize`} onClick={onClick} style={style} >{value}</div>
}

export default Index
