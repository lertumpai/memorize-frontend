import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { clearUser } from '../../utils/localStorage'
import { resetStateAuth } from '../../store/auth/slice'
import { resetStateArticles } from '../../store/articles/slice'
import { resetStateUsers } from '../../store/users/slice'
import './style.scss'

const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isCollapse, setIsCollapse] = useState(false)

  function Home() {
    let classNameIcon = 'icon-memorize fa fa-home'
    let classNameMenu = 'nav-menu-memorize'
    if (router.pathname.includes('/articles')) {
      classNameIcon += ' active-memorize'
      classNameMenu += ' active-memorize'
    }
    return (
      <Link href='/articles'>
        <div className={classNameMenu}>
          <a><i className={classNameIcon} /></a>
        </div>
      </Link>
    )
  }

  function Profile() {
    let classNameIcon = 'icon-memorize fa fa-user'
    let classNameMenu = 'nav-menu-memorize'
    if (router.pathname === '/profile') {
      classNameIcon += ' active-memorize'
      classNameMenu += ' active-memorize'
    }
    return (
      <Link href='/profile'>
        <div className={classNameMenu}>
          <a><i className={classNameIcon} /></a>
        </div>
      </Link>
    )
  }

  function onLogout() {
    clearUser()
    dispatch(resetStateAuth())
    dispatch(resetStateArticles())
    dispatch(resetStateUsers())
  }

  function Logout() {
    return (
      <Link href='#'>
        <div className='nav-menu-memorize' onClick={onLogout}>
          <a><i className='icon-memorize fa fa-sign-out' /></a>
        </div>
      </Link>
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
    const classNameHamburgerMenu = 'hamburger-menu-memorize'
    const classNameHamburger = 'fa fa-bars hamburger-memorize'
    return (
      <div className={classNameHamburgerMenu} onClick={collapse}>
        <Link href=''>
          <a><i className={classNameHamburger} /></a>
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
