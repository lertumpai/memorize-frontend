import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loading from '../../components/Loading'
import { setCurrentUser } from '../../store/auth/slice'
import { loadUser } from '../../utils/localStorage'

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector(state => state.auth)
  const { currentUser } = auth

  useEffect(() => {
    const userLocalStorage = loadUser()
    switch (router.pathname) {
      case '/': {
        if (userLocalStorage && !currentUser) {
          dispatch(setCurrentUser(userLocalStorage))
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
          dispatch(setCurrentUser(userLocalStorage))
        }
      }
    }
  })

  return currentUser || router.pathname === '/' ? children : <Loading height={300} width={300} />
}

export default PrivateRoute
