import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { FiHome } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'

import { clearUser } from '../../utils/localStorage'
import { resetStateAuth } from '../../store/auth/slice'
import './style.scss'

const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  function Home() {
    let className = ''
    className = router.pathname === '/articles' ? className + ' active-memorize' : className
    return (
      <Link href='/articles'>
        <div className={className}>
          <a><FiHome className='icon-memorize'/></a>
        </div>
      </Link>
    )
  }

  function Profile() {
    let className = ''
    className = router.pathname === '/profile' ? className + ' active-memorize' : className
    return (
      <Link href='/profile'>
        <div className={className}>
          <a><CgProfile className='icon-memorize' /></a>
        </div>
      </Link>
    )
  }

  function onLogout() {
    clearUser()
    dispatch(resetStateAuth())
  }

  function Logout() {
    return (
      <Link href='#'>
        <div onClick={onLogout}>
          <a><IoIosLogOut className='icon-memorize' /></a>
        </div>
      </Link>
    )
  }

  return (
    <div className='navbar-memorize'>
        <Home />
        <Profile />
        <Logout />
    </div>
  )
}

export default NavBar
