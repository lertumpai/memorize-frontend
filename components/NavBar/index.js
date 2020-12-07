import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import getConfig from 'next/config'

import { FiHome } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'

import { resetStateAuth } from '../../store/auth/slice'
import './style.scss'

const { publicRuntimeConfig } = getConfig()
const { LOCAL_STORAGE_KEY } = publicRuntimeConfig

const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  function Home() {
    let className = 'nav-menu-memorize'
    className = router.pathname === '/articles' ? className + ' active-memorize' : className
    return (
      <Nav.Link href='/articles'>
        <div className={className}>
          <FiHome className='icon-memorize'/>
        </div>
      </Nav.Link>
    )
  }

  function Profile() {
    let className = 'nav-menu-memorize'
    className = router.pathname === '/profile' ? className + ' active-memorize' : className
    return (
      <Nav.Link href='/profile'>
        <div className={className}>
          <CgProfile className='icon-memorize' />
        </div>
      </Nav.Link>
    )
  }

  function unsaveUser() {
   localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  function onLogout() {
    unsaveUser()
    dispatch(resetStateAuth())
  }

  function Logout() {
    let className = 'nav-menu-memorize'
    return (
      <Nav.Link>
        <div className={className} onClick={onLogout}>
          <IoIosLogOut className='icon-memorize' />
        </div>
      </Nav.Link>
    )
  }

  return (
    <Navbar className='navbar-memorize d-flex justify-content-end' collapseOnSelect expand='lg'>
      <Navbar.Toggle className='mr-3 nav-toggle-memorize' aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <div className='nav-memorize d-flex justify-content-center m-lg-auto'>
          <Nav>
            <Home />
            <Profile />
            <Logout />
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
