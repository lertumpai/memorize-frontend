import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ArticleContainer from '../../containers/ArticleContainer/dynamic'

import { useSocketArticle } from '../../utils/socket'

import './style.scss'

const ArticlePage = () => {
  useSocketArticle()

  return (
    <ApplicationLayout>
      <div className='article-page-container-memorize'>
        <ArticleContainer />
      </div>
    </ApplicationLayout>
  )
}

export default ArticlePage
