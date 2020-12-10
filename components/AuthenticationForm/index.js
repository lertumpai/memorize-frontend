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
        <div className='form-submit-button-memorize' onClick={onRegister}>Register</div>
        <div className='form-change-authen-button-memorize' onClick={onClickRegisterToLogin}>Login</div>
      </>
    )
  }

  function onLogin() {
    dispatch(login(form))
  }

  function ButtonLoginForm() {
    return (
      <>
        <div className='form-submit-button-memorize' onClick={onLogin}>Login</div>
        <div className='form-change-authen-button-memorize' onClick={onClickLoginToRegister}>Register</div>
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
    const message = _.get(error, 'username')
    let classNameFormControl = 'form-text-input-memorize'
    if (message) {
      classNameFormControl += ' form-error-active-memorize'
    }
    return (
      <div className='form-control-memorize'>
        <div className='form-control-text-label-memorize'>Username</div>
        <input className={classNameFormControl} id='username' type='text' value={form.username} onChange={onChange} />
        <div className='form-control-text-error-memorize'>{message}</div>
      </div>
    )
  }

  function PasswordForm() {
    const message = _.get(error, 'password')
    let classNameFormControl = 'form-text-input-memorize'
    if (message) {
      classNameFormControl += ' form-error-active-memorize'
    }
    return (
      <div className='form-control-memorize'>
        <div className='form-control-text-label-memorize'>Password</div>
        <input className={classNameFormControl} id='password' type='password' value={form.password} onChange={onChange} />
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
