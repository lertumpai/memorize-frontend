import base64 from 'base-64'
import getConfig from 'next/config'
import jwt_decode from 'jwt-decode'

const { publicRuntimeConfig } = getConfig()
const { LOCAL_STORAGE_KEY } = publicRuntimeConfig

export function saveUser(user) {
  const userBase64 = base64.encode(JSON.stringify(user))
  localStorage.setItem(LOCAL_STORAGE_KEY, userBase64)
}

export function loadUser() {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storage) {
    return null
  }

  // const user = JSON.parse(base64.decode(storage))

  return storage ? JSON.parse(base64.decode(storage)) : null
}

export function clearUser() {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
