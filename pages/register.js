import { useDispatch } from 'react-redux'
import React from 'react'

import {useInputChange} from '../lib/controller/input'
import {register} from '../lib/slices/authSlice/handler'

const Register = () => {
  const dispatch = useDispatch()
  const [input, handleInputChange] = useInputChange({username: '', password: ''})

  function onSubmit(e) {
    e.preventDefault()
    const {username, password} = input
    dispatch(register({username, password}))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>username </h3>
        <input name='username' value={input.username} onChange={handleInputChange} />
        <br/>
        <h3>password </h3>
        <input name='password' value={input.password} onChange={handleInputChange} />
        <br/>
        <br/>
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default Register