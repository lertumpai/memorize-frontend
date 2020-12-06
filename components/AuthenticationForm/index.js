import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import './style.scss'

const RegisterForm = () => {
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

  function UsernameForm() {
    return (
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' value={form.username} onChange={onChange} />
      </Form.Group>
    )
  }

  function PasswordForm() {
    return (
      <Form.Group controlId='password' className='pt-4'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={form.password} onChange={onChange} />
      </Form.Group>
    )
  }

  function ButtonRegisterForm() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='submit-button' variant='primary' type='button'>Register</Button>
        <Button className='register-login-button ml-1' variant='danger' type='button' onClick={onClickRegisterToLogin}>Login</Button>
      </div>
    )
  }

  function ButtonLoginForm() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='submit-button' variant='primary' type='button'>Login</Button>
        <Button className='login-register-button ml-1' variant='danger' type='button' onClick={onClickLoginToRegister}>Register</Button>
      </div>
    )
  }

  function ButtonForm() {
    return isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
  }

  return (
    <Form className='border p-2'>
      <UsernameForm />
      <PasswordForm />
      <ButtonForm />
    </Form>
  )
}

export default RegisterForm
