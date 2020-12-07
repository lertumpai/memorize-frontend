import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar className='d-flex justify-content-end' collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle className='mr-3' aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <div className='d-flex justify-content-center m-lg-auto'>
          <Nav>
            <Nav.Link className='px-4' href='/articles'>Home</Nav.Link>
            <Nav.Link className='px-4' href='/profile'>Profile</Nav.Link>
            <Nav.Link className='px-4' href='/'>Logout</Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
