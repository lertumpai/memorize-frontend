import React from 'react'

import NavBar from '../../components/NavBar'

import './style.scss'

const Navbar = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='application-layout-memorize'>
        {children}
      </div>
    </>
  )
}

export default Navbar
