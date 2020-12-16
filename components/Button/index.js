import React from 'react'
import './style.scss'

export const MODE_SUBMIT = 'submit'
export const MODE_DISABLE = 'disable'

const Index = ({ onClick, mode, value }) => {
  return <div className={`button-${mode}-memorize`} onClick={onClick} >{value}</div>
}

export default Index
