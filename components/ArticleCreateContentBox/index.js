import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './style.scss'

const Index = () => {

  function ArticleContentBox() {
    return (
      <div className='article-form-textarea-content-box-memorize'>
        <textarea className='article-textarea-content-box-memorize' id='content' rows='5' placeholder='Your post today ^^' />
      </div>
    )
  }

  function ArticleCreateButton() {
    return <div className='article-form-create-button-memorize'>Post</div>
  }

  function ArticleCreateContentBox() {
    return (
      <div className='article-form-create-content-box-memorize'>
        <ArticleContentBox />
        <ArticleCreateButton />
      </div>
    )
  }

  return <ArticleCreateContentBox />
}

export default Index
