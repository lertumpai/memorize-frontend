import React from 'react'

import ApplicationLayout from '../../containers/ApplicationLayout/dynamic'
import ArticleContainer from '../../containers/ArticleContainer/dynamic'

const ArticlePage = () => {
  return (
    <ApplicationLayout>
      <ArticleContainer />
    </ApplicationLayout>
  )
}

export default ArticlePage
