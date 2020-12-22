import React from 'react'
import './style.scss'

const Index = ({ onChange, value, error, id, style, type = 'text' }) => {
  function TextBox() {
    const className = error ? 'text-box-memorize text-box-error-memorize' : 'text-box-memorize'
    return <input className={className} id={id} type={type} value={value} onChange={onChange} style={style} />
  }

  return TextBox()
}

export default React.memo(Index)
