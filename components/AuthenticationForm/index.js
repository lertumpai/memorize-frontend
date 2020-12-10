import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import _ from 'lodash'

import { STATUS_SUCCESS } from '../../store/status'
import { resetStateAuth, idleStateAuth } from '../../store/auth/slice'
import { register, login } from '../../store/auth/asyncThunk'
import { saveUser } from '../../utils/localStorage'
import './style.scss'

const AuthenticationForm = () => {
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
        <button type='button' className='form-submit-button-memorize' onClick={onRegister}>Register</button>
        <button type='button' className='form-register-login-button-memorize' onClick={onClickRegisterToLogin}>Login</button>
      </>
    )
  }

  function onLogin() {
    dispatch(login(form))
  }

  function ButtonLoginForm() {
    return (
      <>
        <button type='button' className='form-submit-button-memorize' onClick={onLogin}>Login</button>
        <button type='button' className='form-login-register-button-memorize' onClick={onClickLoginToRegister}>Register</button>
      </>
    )
  }

  function ButtonForm() {
    const buttonForm = isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
    return (
      <div className=''>
        {buttonForm}
      </div>
    )
  }

  function LabelForm() {
    let text = isLogin ? 'Login Form' : 'Register Form'
    return <div className='form-authentication-label'>{text}</div>
  }

  function UsernameForm() {
    const message = _.get(error, 'username')
    let classNameFormControl = 'form-control-memorize'
    if (message) {
      classNameFormControl += 'form-error-active-memorize'
    }
    return (
      <div className='form-text-input-memorize'>
        <div className='form-control-text-label-memorize'>Username</div>
        <input className={classNameFormControl} type='text' placeholder='Username' value={form.username} onChange={onChange} />
        <div className='form-control-text-error-memorize'>{message}</div>
      </div>
    )
  }

  function PasswordForm() {
    const message = _.get(error, 'password')
    let classNameFormControl = 'form-control-memorize'
    if (message) {
      classNameFormControl += 'form-error-active-memorize'
    }
    return (
      <div className='form-text-input-memorize'>
        <div className='form-control-text-label-memorize'>Password</div>
        <input className={classNameFormControl} type='password' placeholder='Password' value={form.password} onChange={onChange} />
        <div className='form-control-text-error-memorize'>{message}</div>
      </div>
    )
  }

  return (
    <div className='form-authentication-memorize'>
      <LabelForm />
      {UsernameForm()}
      {PasswordForm()}
      <ButtonForm />
    </div>
  )
}

export default AuthenticationForm
