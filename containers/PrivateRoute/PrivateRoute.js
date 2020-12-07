import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import base64 from 'base-64'
import getConfig from 'next/config'

import { setCurrentUser } from '../../store/auth/slice'

const { publicRuntimeConfig } = getConfig()
const { LOCAL_STORAGE_KEY } = publicRuntimeConfig

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector(state => state.auth)
  const { currentUser } = auth

  useEffect(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const userLocalStorage = storage ? base64.decode(storage) : null
    switch (router.pathname) {
      case '/': {
        if (userLocalStorage && !currentUser) {
          const jsonUser = JSON.parse(userLocalStorage)
          dispatch(setCurrentUser(jsonUser))
          return router.push('/articles')
        }

        break
      }

      // eslint-disable-next-line no-fallthrough
      default: {
        if (!userLocalStorage) {
          return router.push('/')
        }

        if (userLocalStorage && !currentUser) {
          const jsonUser = JSON.parse(userLocalStorage)
          dispatch(setCurrentUser(jsonUser))
        }
      }
    }
  })

  return currentUser || router.pathname === '/' ? children : ''
}

export default PrivateRoute
