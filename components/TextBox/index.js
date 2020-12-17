import React from 'react'
import './style.scss'

const Index = ({ onChange, value, error, id, style }) => {
  function TextBox() {
    const className = error ? 'text-box-memorize text-box-error-memorize' : 'text-box-memorize'
    return <input className={className} id={id} type='text' value={value} onChange={onChange} style={style} />
  }

  return TextBox()
}

export default Index
