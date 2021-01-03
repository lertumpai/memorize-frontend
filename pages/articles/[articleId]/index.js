import React from 'react'
import { useRouter } from 'next/router'

import ApplicationLayout from '../../../containers/ApplicationLayout/dynamic'
import CommentContainer from '../../../containers/CommentContainer/dynamic'

import { useSocket } from '../../../utils/socket/useSocket'
import { useSocketComment, useSocketArticle } from '../../../utils/socket'

const ArticleIdPage = () => {
  const socket = useSocket()
  useSocketComment(socket)
  useSocketArticle(socket)

  const router = useRouter()
  const { articleId } = router.query

  return (
    <ApplicationLayout>
      <CommentContainer articleId={articleId} />
    </ApplicationLayout>
  )
}

export default ArticleIdPage
