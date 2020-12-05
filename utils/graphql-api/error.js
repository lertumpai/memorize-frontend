export function error(graphQLErrors) {
  return graphQLErrors[0]['message']
}
