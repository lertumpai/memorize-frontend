import config from '../config'

const jsonHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

async function request(path, {method, headers, body}) {
  const url = `${config.base_url}/${path}`

  const response = await fetch(url,
    {
    method,
    headers,
    body: JSON.stringify(body)
    })

  return response.json()
}

function headers() {
  const token = localStorage.token
  return token
    ? {
      ...jsonHeader,
      Authorization: token
    }
    : jsonHeader
}

export const get = () => {

}

export const post = async (path, {body}) => {
  const response = await request(path, {method: 'POST', headers: headers(), body})

  if (response.error) {
    throw Error(response.error)
  }

  return response
}