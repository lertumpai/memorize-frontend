import React from 'react'

import NavBar from '../../components/NavBar'

import ApplicationLayoutStyles from './style.module.scss'

const ApplicationLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div id='application-layout-memorize' className={ApplicationLayoutStyles.applicationLayoutMemorize}>
        {children}
      </div>
    </>
  )
}

export default ApplicationLayout
