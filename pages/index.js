import React from 'react'

import AuthenticationContainer from '../containers/AuthenticationContainer/dynamic'

const IndexPage = () => {
  return (
    <div className='bg-authentication'>
      <img className='bg' src='background-authentication.jpg' alt='authentication-bg' />
      <AuthenticationContainer />
      <style jsx>{`
        .bg {
          position: fixed;
          width: 100%;
          height: 100%;
          opacity: 0.2;
        }
      `}</style>
    </div>
  )
}

export default IndexPage
