import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ArticleContainer from '../../containers/ArticleContainer/dynamic'

import { useSocketPageArticles } from '../../utils/socket/useSocketPageArticles'

import './style.scss'

const ArticlePage = () => {
  useSocketPageArticles()

  return (
    <ApplicationLayout>
      <div className='article-page-container-memorize'>
        <ArticleContainer />
      </div>
    </ApplicationLayout>
  )
}

export default ArticlePage
