import React from 'react'

import NavBar from '../../components/NavBar'

const ApplicationLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default ApplicationLayout
