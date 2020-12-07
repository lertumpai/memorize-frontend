import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useRouter } from 'next/router'

import { FiHome } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'

import './style.scss'

const NavBar = () => {
  const router = useRouter()

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

  function Logout() {
    let className = 'nav-menu-memorize'
    return (
      <Nav.Link href='/'>
        <div className={className}>
          <IoIosLogOut className='icon-memorize' />
        </div>
      </Nav.Link>
    )
  }

  return (
    <Navbar className='navbar-memorize d-flex justify-content-end' collapseOnSelect expand='lg'>
      <Navbar.Toggle className='mr-3' aria-controls='responsive-navbar-nav' />
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
