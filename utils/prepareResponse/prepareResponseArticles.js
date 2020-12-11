export default function prepareResponseArticles(response) {
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
