import React from 'react'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'

import './style.scss'

const Index = ({ value, onChange, onMemorize }) => {
  function MemorizeContentBox() {
    return (
      <div className='memorize-form-textarea-content-box-memorize'>
        <TextAreaBox
          className='memorize-textarea-content-box-memorize input-memorize'
          id='content'
          placeholder='Your post today ^^'
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }

  function MemorizeCreateButton() {
    const classNameButton = value
      ? 'memorize-create-button-memorize'
      : 'memorize-create-button-memorize disable-click-memorize'
    return (
        <div className='memorize-form-create-button-memorize'>
          <Button onClick={onMemorize} className={classNameButton} value='Memorize' />
        </div>
      )
  }

  function MemorizeCreateContentBox() {
    return (
      <div className='memorize-form-create-content-box-memorize'>
        {MemorizeContentBox()}
        <MemorizeCreateButton />
      </div>
    )
  }

  return MemorizeCreateContentBox()
}

export default Index
