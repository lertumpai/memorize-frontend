import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { register } from '../../store/auth/asyncThunk'
import './style.scss'

const AuthenticationForm = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ username: '', password: '' })
  const [isLogin, setIsLogin] = useState(true)

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  function onClickLoginToRegister() {
    setIsLogin(false)
    setForm({ username: '', password: '' })
  }

  function onClickRegisterToLogin() {
    setIsLogin(true)
    setForm({ username: '', password: '' })
  }

  function onRegister() {
    dispatch(register(form))
  }

  function ButtonRegisterForm() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='submit-button' variant='success' type='button' onClick={onRegister}>Register</Button>
        <Button className='register-login-button ml-1' type='button' onClick={onClickRegisterToLogin}>Login</Button>
      </div>
    )
  }

  function onLogin() {

  }

  function ButtonLoginForm() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='submit-button' variant='success' type='button' onClick={onLogin}>Login</Button>
        <Button className='login-register-button ml-1' type='button' onClick={onClickLoginToRegister}>Register</Button>
      </div>
    )
  }

  function ButtonForm() {
    return isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
  }

  function LabelForm() {
    let text = isLogin ? 'Login Form' : 'Register Form'
    return <Form.Label className='authentication-label'>{text}</Form.Label>
  }

  function UsernameForm() {
    return (
      <Form.Group className='pt-4' controlId='username'>
        <Form.Label className='text-label'>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' value={form.username} onChange={onChange} />
      </Form.Group>
    )
  }

  function PasswordForm() {
    return (
      <Form.Group className='pt-4' controlId='password'>
        <Form.Label className='text-label'>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={form.password} onChange={onChange} />
      </Form.Group>
    )
  }

  return (
    <Form className='form-style p-4'>
      <LabelForm />
      {UsernameForm()}
      {PasswordForm()}
      <ButtonForm />
    </Form>
  )
}

export default AuthenticationForm
