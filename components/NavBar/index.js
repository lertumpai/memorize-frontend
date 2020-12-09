import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { FiHome } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

import { clearUser } from '../../utils/localStorage'
import { resetStateAuth } from '../../store/auth/slice'
import './style.scss'
import { func } from 'prop-types'

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
          <a><FiHome className={classNameIcon} /></a>
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
          <a><CgProfile className={classNameIcon} /></a>
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
          <a><IoIosLogOut className='icon-memorize' /></a>
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
          <a><GiHamburgerMenu className='icon-memorize' /></a>
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
