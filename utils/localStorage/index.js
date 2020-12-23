import getConfig from 'next/config'
import jwt_decode from 'jwt-decode'

const { publicRuntimeConfig } = getConfig()
const { LOCAL_STORAGE_KEY } = publicRuntimeConfig

export function saveUser(user) {
  localStorage.setItem(LOCAL_STORAGE_KEY, user.token)
}

export function loadUser() {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storage) {
    return null
  }

  const tokenDecoded = jwt_decode(storage)
  const date = new Date()

  if (date.valueOf() > tokenDecoded.exp * 1000) {
    clearUser()
    return null
  }

  const user = {
    id: tokenDecoded.id,
    username: tokenDecoded.username,
    profile: tokenDecoded.profile,
    token: storage,
  }

  return user
}

export function clearUser() {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
