import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import './style.scss'

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', password: '' })

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
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

  function ButtonForm() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='register-button' variant='primary' type='button'>Register</Button>
        <Button className='login-button ml-1' variant='danger' type='button'>Cancel</Button>
      </div>
    )
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
