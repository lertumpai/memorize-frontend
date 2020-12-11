import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './style.scss'
import { STATUS_SUCCESS } from '../../store/status'
import { idleStateArticles } from '../../store/articles/slice'

const Index = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      dispatch(idleStateArticles())
    }
  })

  function onContentChange(e) {
    setContent(e.target.value)
  }

  function ArticleContentBox() {
    return (
      <div className='article-form-textarea-content-box-memorize'>
        <textarea
          className='article-textarea-content-box-memorize'
          id='content'
          rows='5'
          placeholder='Your post today ^^'
          value={content}
          onChange={onContentChange}
        />
      </div>
    )
  }

  function ArticleCreateButton() {
    return (
      <div className='article-form-create-button-memorize'>
        <div className='article-create-button-memorize'>Post</div>
      </div>
    )
  }

  function ArticleCreateContentBox() {
    return (
      <div className='article-form-create-content-box-memorize'>
        {ArticleContentBox()}
        <ArticleCreateButton />
      </div>
    )
  }

  return <ArticleCreateContentBox />
}

export default Index
