import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { articleSelectors } from '../../store/articles/slice'
import { userSelectors } from '../../store/users/slice'
import { queryArticles } from '../../store/articles/asyncThunk'
import ContentArticleBox from '../../components/ContentArticleBox/dynamic'

const ArticleContainer = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const articles = articleSelectors.selectAll(state)

  useEffect(() => {
    dispatch(queryArticles({}))
  }, [articles])

  function ContentArticleBoxes() {
    return articles.map(article => {
      const user = userSelectors.selectById(state, article.author.id)
      return <ContentArticleBox key={article.id} article={article} user={user} />
    })
  }

  return (
    <div className='content-boxes-memorize'>
      {ContentArticleBoxes()}
    </div>
  )
}

export default ArticleContainer
