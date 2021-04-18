import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ArticleContainer from '../../containers/ArticleContainer/dynamic'

import { useSocket } from '../../utils/socket/useSocket'
import { useSocketArticle } from '../../utils/socket'

import ArticleStyles from './style.module.scss'

const ArticlePage = () => {
  const socket = useSocket()
  useSocketArticle(socket)

  return (
    <ApplicationLayout>
      <div className={ArticleStyles.articlePageContainerMemorize}>
        <ArticleContainer />
      </div>
    </ApplicationLayout>
  )
}

export default ArticlePage
