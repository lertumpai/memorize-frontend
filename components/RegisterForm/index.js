import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', password: '' })

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  return (
    <Form className='border'>
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' value={form.username} onChange={onChange} />
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={form.password} onChange={onChange} />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default RegisterForm
