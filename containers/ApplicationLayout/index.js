import React from 'react'

import NavBar from '../../components/NavBar'

const Index = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default Index
