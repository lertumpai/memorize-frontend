import React from 'react'

import NavBar from '../../components/NavBar'

const Index = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Index
