import React from 'react'

import AuthenticationForm from '../../components/AuthenticationForm/dynamic'
import './style.scss'

const AuthenticationContainer = () => {
  return (
    <div className='authentication-container-memorize'>
      <AuthenticationForm />
    </div>
  )
}

export default AuthenticationContainer
