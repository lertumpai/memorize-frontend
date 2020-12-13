import React, { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import './style.scss'
import { MODE_CREATE } from './mode'

// memorize = { id, status, content }
const Index = ({ memorize, mutateContent, articleId, mode = MODE_CREATE }) => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  useMemo(() => {
   if (memorize?.content) {
     setContent(memorize.content)
   }
  }, [])

  function onContentChange(e) {
    setContent(e.target.value)
  }

  function onContentClick() {
    const mutateObject = {
      id: memorize?.id,
      content,
      articleId,
    }
    dispatch(mutateContent(mutateObject))
    setContent('')
  }

  function MemorizeContentBox() {
    return (
      <div className='memorize-form-textarea-content-box-memorize'>
        <textarea
          className='memorize-textarea-content-box-memorize input-memorize'
          id='content'
          rows='5'
          placeholder='Your post today ^^'
          value={content}
          onChange={onContentChange}
        />
      </div>
    )
  }

  function MemorizeCreateButton() {
    const classNameButton = content.length > 0
      ? 'memorize-create-button-memorize'
      : 'memorize-create-button-memorize disable-click-memorize'
    return (
      <div className='memorize-form-create-button-memorize'>
        <div className={classNameButton} onClick={onContentClick} >Memorize</div>
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
