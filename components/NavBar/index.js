import { Navbar, Nav } from 'react-bootstrap'
import { useRouter } from 'next/router'

import './style.scss'

const NavBar = () => {
  const router = useRouter()

  function Home() {
    const className = router.pathname === '/articles' ? 'active-memorize px-4' : 'px-4'
    return (
      <Nav.Link href='/articles'>
        <div className={className}>Home</div>
      </Nav.Link>
    )
  }

  function Profile() {
    const className = router.pathname === '/profile' ? 'active-memorize px-4' : 'px-4'
    return (
      <Nav.Link href='/profile'>
        <div className={className}>Profile</div>
      </Nav.Link>
    )
  }

  function Logout() {
    return <Nav.Link className='px-4' href='/'>Logout</Nav.Link>
  }

  return (
    <Navbar className='navbar-memorize d-flex justify-content-end' collapseOnSelect expand='lg'>
      <Navbar.Toggle className='mr-3' aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <div className='d-flex justify-content-center m-lg-auto'>
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
