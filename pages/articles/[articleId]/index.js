import React from 'react'
import { useRouter } from 'next/router'

import ApplicationLayout from '../../../containers/ApplicationLayout/dynamic'
import CommentContainer from '../../../containers/CommentContainer/dynamic'

import { useSocketComment, useSocketArticle } from '../../../utils/socket'

const ArticleIdPage = () => {
  useSocketComment()
  useSocketArticle()

  const router = useRouter()
  const { articleId } = router.query

  return (
    <ApplicationLayout>
      <CommentContainer articleId={articleId} />
    </ApplicationLayout>
  )
}

export default ArticleIdPage
