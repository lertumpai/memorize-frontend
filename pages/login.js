import { useDispatch } from 'react-redux'
import React from 'react'

import { useInputChange } from '../stores/controller/input'
import { login } from '../stores/slices/authSlice/handler'

const Login = () => {
  const dispatch = useDispatch()
  const [input, handleInputChange] = useInputChange({ username: '', password: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const { username, password } = input
    dispatch(login({ username, password }))
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

export default Login
