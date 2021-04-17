import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import { useRouter } from 'next/router'
import { STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, login, register, resetStateAuth } from '../../store/auth/slice'

import './style.module.scss'

const AuthenticationContainerIndex = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const auth = useSelector(state => state.auth)
  const { error, currentUser, status } = auth

  const [form, setForm] = useState({ username: '', password: '' })
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (status === STATUS_SUCCESS && currentUser) {
      saveUser(currentUser)
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
      <>
        <Button className='button-memorize green-memorize' onClick={onRegister} value='Register'/>
        <Button className='button-memorize blue-memorize' onClick={onClickRegisterToLogin} value='Login'/>
      </>
    )
  }

  function onLogin() {
    dispatch(login(form))
  }

  function ButtonLoginForm() {
    return (
      <>
        <Button className='button-memorize green-memorize' onClick={onLogin} value='Login'/>
        <Button className='button-memorize blue-memorize' onClick={onClickLoginToRegister} value='Register'/>
      </>
    )
  }

  function ButtonForm() {
    const buttonForm = isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
    return (
      <div className='container-authentication-button-memorize'>
        {buttonForm}
      </div>
    )
  }

  function LabelForm() {
    const label = isLogin ? 'Login Form' : 'Register Form'
    return <div className='label-authentication-memorize'>{label}</div>
  }

  function UsernameForm() {
    const message = error?.username
    const classNameTextbox = `textbox-memorize ${message ? 'textbox-error-memorize' : ''}`

    return (
      <div className='container-authentication-form-control-memorize'>
        <div className='textbox-label-authentication-memorize'>Username</div>
        <TextBox className={classNameTextbox} id='username' value={form.username} onChange={onChange} />
        <div className='error-message-authentication-memorize'>{message}</div>
      </div>
    )
  }

  function PasswordForm() {
    const message = error?.password
    const classNameTextbox = `textbox-memorize ${message ? 'textbox-error-memorize' : ''}`

    return (
      <div className='container-authentication-form-control-memorize'>
        <div className='textbox-label-authentication-memorize'>Password</div>
        <TextBox className={classNameTextbox} id='password' type='password' value={form.password} error={message} onChange={onChange} />
        <div className='error-message-authentication-memorize'>{message}</div>
      </div>
    )
  }

  function AuthenticationContainer() {
    return (
      <div className='container-authentication-form-memorize'>
        <LabelForm />
        {UsernameForm()}
        {PasswordForm()}
        <ButtonForm />
      </div>
    )
  }

  return (
    <div className='container-authentication-memorize'>
      {AuthenticationContainer()}
    </div>
  )
}

export default AuthenticationContainerIndex
