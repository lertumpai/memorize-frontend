import React from 'react'

import NavBar from '../../components/NavBar'

import './style.scss'

const Navbar = ({ children }) => {
  return (
    <>
      <NavBar />
      <div id='application-layout-memorize' className='application-layout-memorize'>
        {children}
      </div>
    </>
  )
}

export default Navbar
