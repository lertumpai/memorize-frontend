export default function prepareResponseArticles(response) {
  const { articles } = response

  const users = articles.map(({ author }) => author)
  const preparedArticles = articles.map(article => {
    return {
      ...article,
      author: {
        id: article.author.id,
      },
    }
  })

  return { users, articles: preparedArticles }
}
