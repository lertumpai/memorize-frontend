import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import { useRouter } from 'next/router'
import { STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, login, register, resetStateAuth } from '../../store/auth/slice'

import styles from '../../components/styles'
import AuthenticationContainerStyles from './style.module.scss'

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
        <Button className={`${styles.Button.buttonMemorize} green-memorize`} onClick={onRegister} value='Register'/>
        <Button className={`${styles.Button.buttonMemorize} blue-memorize`} onClick={onClickRegisterToLogin} value='Login'/>
      </>
    )
  }

  function onLogin() {
    dispatch(login(form))
  }

  function ButtonLoginForm() {
    return (
      <>
        <Button className={`${styles.Button.buttonMemorize} green-memorize`} onClick={onLogin} value='Login'/>
        <Button className={`${styles.Button.buttonMemorize} blue-memorize`} onClick={onClickLoginToRegister} value='Register'/>
      </>
    )
  }

  function ButtonForm() {
    const buttonForm = isLogin ? <ButtonLoginForm /> : <ButtonRegisterForm />
    return (
      <div className={AuthenticationContainerStyles.containerAuthenticationButtonMemorize}>
        {buttonForm}
      </div>
    )
  }

  function LabelForm() {
    const label = isLogin ? 'Login Form' : 'Register Form'
    return <div className={AuthenticationContainerStyles.labelAuthenticationMemorize}>{label}</div>
  }

  function UsernameForm() {
    const message = error?.username
    const classNameTextbox = `${styles.TextBox.textboxMemorize} ${message ? styles.TextBox.textboxErrorMemorize : ''}`

    return (
      <div className={AuthenticationContainerStyles.containerAuthenticationFormControlMemorize} >
        <div className={AuthenticationContainerStyles.textboxLabelAuthenticationMemorize}>Username</div>
        <TextBox className={classNameTextbox} id='username' value={form.username} onChange={onChange} />
        <div className={AuthenticationContainerStyles.errorMessageAuthenticationMemorize}>{message}</div>
      </div>
    )
  }

  function PasswordForm() {
    const message = error?.password
    const classNameTextbox = `${styles.TextBox.textboxMemorize} ${message ? styles.TextBox.textboxErrorMemorize : ''}`

    return (
      <div className={AuthenticationContainerStyles.containerAuthenticationFormControlMemorize} >
        <div className={AuthenticationContainerStyles.textboxLabelAuthenticationMemorize}>Password</div>
        <TextBox className={classNameTextbox} id='password' type='password' value={form.password} error={message} onChange={onChange} />
        <div className={AuthenticationContainerStyles.errorMessageAuthenticationMemorize}>{message}</div>
      </div>
    )
  }

  function AuthenticationContainer() {
    return (
      <div className={AuthenticationContainerStyles.containerAuthenticationFormMemorize}>
        <LabelForm />
        {UsernameForm()}
        {PasswordForm()}
        <ButtonForm />
      </div>
    )
  }

  return (
    <div className={AuthenticationContainerStyles.containerAuthenticationMemorize}>
      {AuthenticationContainer()}
    </div>
  )
}

export default AuthenticationContainerIndex
