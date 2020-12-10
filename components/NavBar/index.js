import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { clearUser } from '../../utils/localStorage'
import { resetStateAuth } from '../../store/auth/slice'
import './style.scss'

const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isCollapse, setIsCollapse] = useState(false)

  function Home() {
    let classNameIcon = 'icon-memorize'
    let classNameMenu = 'nav-menu-memorize'
    if (router.pathname === '/articles') {
      classNameIcon += ' active-memorize'
      classNameMenu += ' active-memorize'
    }
    return (
      <div className={classNameMenu}>
        <Link href='/articles'>
          <a>home</a>
        </Link>
      </div>
    )
  }

  function Profile() {
    let classNameIcon = 'icon-memorize'
    let classNameMenu = 'nav-menu-memorize'
    if (router.pathname === '/profile') {
      classNameIcon += ' active-memorize'
      classNameMenu += ' active-memorize'
    }
    return (
      <div className={classNameMenu}>
        <Link href='/profile'>
          <a>profile</a>
        </Link>
      </div>
    )
  }

  function onLogout() {
    clearUser()
    dispatch(resetStateAuth())
  }

  function Logout() {
    let className = 'nav-menu-memorize'
    return (
      <div className={className} onClick={onLogout}>
        <Link href='#'>
          <a>logout</a>
        </Link>
      </div>
    )
  }

  function NavbarLink() {
    let className = 'navbar-link-memorize'
    if (isCollapse) {
      className += ' collapse'
    }
    return (
      <div className={className}>
        <Home />
        <Profile />
        <Logout />
      </div>
    )
  }

  function collapse() {
    setIsCollapse(!isCollapse)
  }

  function HamburgerMenu() {
    let className = 'hamburger-menu-memorize'
    return (
      <div className={className} onClick={collapse}>
        <Link href=''>
          <a>ham</a>
        </Link>
      </div>
    )
  }

  function NavbarCollapse() {
    return (
      <div className='navbar-memorize'>
        <NavbarLink />
        <HamburgerMenu />
      </div>
    )
  }

  return <NavbarCollapse />
}

export default NavBar
