import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { clearUser } from '../../utils/localStorage'
import { resetStateAuth } from '../../store/auth/slice'
import { resetStateArticles } from '../../store/articles/slice'
import { resetStateUsers } from '../../store/users/slice'
import { resetStateComments } from '../../store/comments/slice'

import styles from '../styles'

const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isCollapse, setIsCollapse] = useState(false)

  function Home() {
    let classNameIcon = `${styles.NavBar.iconMemorize} fa fa-home`
    let classNameMenu = styles.NavBar.navMenuMemorize
    if (router.pathname.includes('/articles')) {
      classNameIcon += ` ${styles.NavBar.activeMemorize}`
      classNameMenu += ` ${styles.NavBar.activeMemorize}`
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
    let classNameIcon = `${styles.NavBar.iconMemorize} fa fa-user`
    let classNameMenu = styles.NavBar.navMenuMemorize
    if (router.pathname === '/profile') {
      classNameIcon += ` ${styles.NavBar.activeMemorize}`
      classNameMenu += ` ${styles.NavBar.activeMemorize}`
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
    dispatch(resetStateComments())
  }

  function Logout() {
    return (
      <Link href='/'>
        <div className={styles.NavBar.navMenuMemorize} onClick={onLogout}>
          <a><i className={`${styles.NavBar.iconMemorize} fa fa-sign-out`} /></a>
        </div>
      </Link>
    )
  }

  function NavbarLink() {
    let className = styles.NavBar.navbarLinkMemorize
    if (isCollapse) {
      className += ` ${styles.NavBar.collapse}`
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
    const classNameHamburgerMenu = styles.NavBar.hamburgerMenuMemorize
    const classNameHamburger = `fa fa-bars ${styles.NavBar.hamburgerMemorize}`
    return (
      <div className={classNameHamburgerMenu} onClick={collapse}>
        <a><i className={classNameHamburger} /></a>
      </div>
    )
  }

  function NavbarCollapse() {
    return (
      <div className={styles.NavBar.navbarMemorize}>
        <NavbarLink />
        <HamburgerMenu />
      </div>
    )
  }

  return <NavbarCollapse />
}

export default NavBar
