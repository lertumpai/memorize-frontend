import React from 'react'

import './style.scss'
import AuthenticationForm from '../../components/AuthenticationForm'

const AuthenticationContainer = () => {
  return (
    <div className='container-authentication d-flex justify-content-center align-items-center'>
      <AuthenticationForm />
    </div>
  )
}

export default AuthenticationContainer
