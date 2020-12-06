import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import base64 from 'base-64'

import { setCurrentUser } from '../../store/auth/slice'

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const auth = useSelector(state => state.auth)
  const { currentUser } = auth

  useEffect(() => {
    const storage = localStorage.getItem('current_user')
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
        if (!userLocalStorage || !currentUser) {
          return router.push('/')
        }

        if (userLocalStorage && !currentUser) {
          const jsonUser = JSON.parse(userLocalStorage)
          dispatch(setCurrentUser(jsonUser))
        }
      }
    }
  })

  return currentUser || router.pathname === '/' ? children : 'loading'
}

export default PrivateRoute
