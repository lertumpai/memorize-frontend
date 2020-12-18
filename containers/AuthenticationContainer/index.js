import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import { useRouter } from 'next/router'
import { STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, login, register, resetStateAuth } from '../../store/auth/slice'

import './style.scss'

const Index = () => {
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
        <Button className='form-submit-button-memorize' onClick={onRegister} value='Register'/>
        <Button className='form-change-authen-button-memorize' onClick={onClickRegisterToLogin} value='Login'/>
      </>
    )
  }

  function onLogin() {
    dispatch(login(form))
  }

  function ButtonLoginForm() {
    return (
      <>
        <Button className='form-submit-button-memorize' onClick={onLogin} value='Login'/>
        <Button className='form-change-authen-button-memorize' onClick={onClickLoginToRegister} value='Register'/>
      </>
    )
  }

  function ButtonForm() {
    const buttonForm = isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
    return (
      <div className='form-button-memorize'>
        {buttonForm}
      </div>
    )
  }

  function LabelForm() {
    let text = isLogin ? 'Login Form' : 'Register Form'
    return <div className='form-authentication-label'>{text}</div>
  }

  function UsernameForm() {
    const message = error?.username
    let classNameFormControl = 'form-text-input-memorize input-memorize'
    if (message) {
      classNameFormControl += ' form-error-active-memorize'
    }

    return (
      <div className='form-control-memorize'>
        <div className='form-control-text-label-memorize'>Username</div>
        <TextBox className={classNameFormControl} id='username'value={form.username} error={message} onChange={onChange} />
        <div className='form-control-text-error-memorize'>{message}</div>
      </div>
    )
  }

  function PasswordForm() {
    const message = error?.password
    let classNameFormControl = 'form-text-input-memorize input-memorize'
    if (message) {
      classNameFormControl += ' form-error-active-memorize'
    }
    return (
      <div className='form-control-memorize'>
        <div className='form-control-text-label-memorize'>Password</div>
        <TextBox className={classNameFormControl} id='password' type='password' value={form.password} error={message} onChange={onChange} />
        <div className='form-control-text-error-memorize'>{message}</div>
      </div>
    )
  }

  function AuthenticationContainer() {
    return (
      <div className='form-authentication-memorize'>
        <LabelForm />
        {UsernameForm()}
        {PasswordForm()}
        <ButtonForm />
      </div>
    )
  }

  return (
    <div className='authentication-container-memorize'>
      {AuthenticationContainer()}
    </div>
  )
}

export default Index
