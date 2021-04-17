import React from 'react'

import NavBar from '../../components/NavBar'

import './style.module.scss'

const ApplicationLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div id='application-layout-memorize' className='application-layout-memorize'>
        {children}
      </div>
    </>
  )
}

export default ApplicationLayout
