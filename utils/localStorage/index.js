import base64 from 'base-64'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { LOCAL_STORAGE_KEY } = publicRuntimeConfig

export function saveUser(user) {
  const userBase64 = base64.encode(JSON.stringify(user))
  localStorage.setItem(LOCAL_STORAGE_KEY, userBase64)
}

export function loadUser() {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storage ? JSON.parse(base64.decode(storage)) : null
}
