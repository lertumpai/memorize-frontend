import React from 'react'
import { useRouter } from 'next/router'

import ApplicationLayout from '../../../containers/ApplicationLayout/dynamic'
import CommentContainer from '../../../containers/CommentContainer/dynamic'

const Index = () => {
  const router = useRouter()
  const { articleId } = router.query

  return (
    <ApplicationLayout>
      <CommentContainer articleId={articleId} />
    </ApplicationLayout>
  )
}

export default Index
