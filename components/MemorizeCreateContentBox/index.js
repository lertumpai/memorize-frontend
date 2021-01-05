import React from 'react'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'

import './style.scss'

const MemorizeCreateContentBoxIndex = ({ id, articleId, content, setContent, onChange, onMemorize }) => {
  function onClickMemorize() {
    onMemorize({ id, content, articleId, setContent })
  }

  function MemorizeContentBox() {
    return (
      <TextAreaBox
        className='textarea-content-box-memorize'
        id='content'
        placeholder='Your post today ^^'
        value={content}
        onChange={onChange}
      />
    )
  }

  function MemorizeCreateButton() {
    const color = content ? 'green-memorize' : 'disable-memorize'
    const classNameButton = `button-create-content-memorize ${color}`
    return <Button onClick={onClickMemorize} className={classNameButton} value='Memorize' />
  }

  function MemorizeImage() {
    const classNameIcon = 'icon-upload-image-memorize fa fa-picture-o'
    return <i className={classNameIcon} />
  }

  function MemorizeCreateContentBox() {
    return (
      <div className='container-form-create-content-box-memorize'>
        {MemorizeContentBox()}
        <div className='container-form-upload-create-memorize'>
          <div className='container-form-upload-image-memorize'>
            {MemorizeImage()}
          </div>
          <div className='container-create-content-button-memorize'>
            {MemorizeCreateButton()}
          </div>
        </div>
      </div>
    )
  }

  return MemorizeCreateContentBox()
}

export default React.memo(MemorizeCreateContentBoxIndex)
