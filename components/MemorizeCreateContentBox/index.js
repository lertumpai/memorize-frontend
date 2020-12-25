import React from 'react'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'

import './style.scss'

const MemorizeCreateContentBoxIndex = ({ id, articleId, content, onChange, onMemorize }) => {
  function onClickMemorize() {
    onMemorize({ id, content, articleId })
  }

  function MemorizeContentBox() {
    return (
      <div className='memorize-form-textarea-content-box-memorize'>
        <TextAreaBox
          className='memorize-textarea-content-box-memorize'
          id='content'
          placeholder='Your post today ^^'
          value={content}
          onChange={onChange}
        />
      </div>
    )
  }

  function MemorizeCreateButton() {
    const color = content ? 'green-memorize' : 'disable-memorize'
    const classNameButton = `button-memorize ${color}`
    return (
        <div className='container-create-content-button-memorize'>
          <Button onClick={onClickMemorize} className={classNameButton} value='Memorize' />
        </div>
      )
  }

  function MemorizeCreateContentBox() {
    return (
      <div className='container-form-create-content-box-memorize'>
        {MemorizeContentBox()}
        <MemorizeCreateButton />
      </div>
    )
  }

  return MemorizeCreateContentBox()
}

export default React.memo(MemorizeCreateContentBoxIndex)
