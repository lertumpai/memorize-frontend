import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import _ from 'lodash'
import base64 from 'base-64'

import { STATUS_SUCCESS } from '../../store/status'
import { resetStateAuth, idleStateAuth } from '../../store/auth/slice'
import { register, login } from '../../store/auth/asyncThunk'
import './style.scss'

const AuthenticationForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const auth = useSelector(state => state.auth)
  const { error, user, status } = auth

  const [form, setForm] = useState({ username: '', password: '' })
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (status === STATUS_SUCCESS && user) {
      const userInformation = base64.encode(JSON.stringify(user))
      localStorage.setItem('current_user', userInformation)
      dispatch(idleStateAuth())
      router.push('/articles')
    }
  })

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  function onClickLoginToRegister() {
    setIsLogin(false)
    setForm({ username: '', password: '' })
    dispatch(resetStateAuth())
  }

  function onClickRegisterToLogin() {
    setIsLogin(true)
    setForm({ username: '', password: '' })
    dispatch(resetStateAuth())
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
    dispatch(login(form))
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
    const message = _.get(error, 'username')
    const errorControlStyle = message ? 'form-control-error' : ''
    return (
      <Form.Group className='pt-4' controlId='username'>
        <Form.Label className='text-label'>Username</Form.Label>
        <Form.Control className={errorControlStyle} type='text' placeholder='Username' value={form.username} onChange={onChange} />
        <Form.Text className='text-error'>{message}</Form.Text>
      </Form.Group>
    )
  }

  function PasswordForm() {
    const message = _.get(error, 'password')
    const errorControlStyle = message ? 'form-control-error' : ''
    return (
      <Form.Group className='pt-4' controlId='password'>
        <Form.Label className='text-label'>Password</Form.Label>
        <Form.Control className={errorControlStyle} type='password' placeholder='Password' value={form.password} onChange={onChange} />
        <Form.Text className='text-error'>{message}</Form.Text>
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
