import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ArticleContainer from '../../containers/ArticleContainer/dynamic'

import { useSocket } from '../../utils/socket/useSocket'
import { useSocketArticle } from '../../utils/socket'

import './style.module.scss'

const ArticlePage = () => {
  const socket = useSocket()
  useSocketArticle(socket)

  return (
    <ApplicationLayout>
      <div className='article-page-container-memorize'>
        <ArticleContainer />
      </div>
    </ApplicationLayout>
  )
}

export default ArticlePage
