import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mx-lg-auto'>
          <Nav.Link href='/articles'>Home</Nav.Link>
          <Nav.Link href='/articles'>Articles</Nav.Link>
          <Nav.Link href='/profile'>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
