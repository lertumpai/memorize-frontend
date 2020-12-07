import React from 'react'

import './style.scss'
import AuthenticationForm from '../../components/AuthenticationForm'

const AuthenticationContainer = () => {
  return (
    <div className='authentication-container d-flex justify-content-center align-items-center'>
      <AuthenticationForm />
    </div>
  )
}

export default AuthenticationContainer
