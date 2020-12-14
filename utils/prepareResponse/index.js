export function prepareResponseArticles(response) {
  const { articles, article } = response

  if (article) {
    const user = article.author
    const _article = { ...article, author: user.id }
    return { user, article: _article }
  }

  const users = articles.map(({ author }) => author)
  const preparedArticles = articles.map(article => {
    return {
      ...article,
      author: article.author.id,
    }
  })

  return { users, articles: preparedArticles }
}

export function prepareResponseComments(response) {
  const { comments, comment } = response

  if (comment) {
    const user = comment.author
    const _comment = { ...comment, author: user.id }
    return { user, comment: _comment }
  }

  const users = comments.map(({ author }) => author)
  const preparedComments = comments.map(comment => {
    return {
      ...comment,
      author: comment.author.id,
    }
  })

  return { users, comments: preparedComments }
}

