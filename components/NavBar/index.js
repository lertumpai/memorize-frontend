import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mx-lg-auto'>
          <Nav.Link className='px-4' href='/articles'>Home</Nav.Link>
          <Nav.Link className='px-4' href='/profile'>Profile</Nav.Link>
          <Nav.Link className='px-4' href='/'>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
