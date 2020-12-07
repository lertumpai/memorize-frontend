import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Button, Form } from 'react-bootstrap'
import _ from 'lodash'

import './style.scss'

const ProfileForm = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { error, currentUser, status } = auth

  const initialProfile = {
    name: _.get(currentUser, 'profile.name'),
    status: _.get(currentUser, 'profile.status'),
  }
  const [profile, setProfile] = useState(initialProfile)

  function onProfileChange(e) {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  function Name() {
    return (
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' value={profile.name} onChange={onProfileChange} />
      </Form.Group>
    )
  }

  function Status() {
    return (
      <Form.Group controlId='status' className='pt-3'>
        <Form.Label>Status</Form.Label>
        <Form.Control as='textarea' rows={3} value={profile.status} onChange={onProfileChange} />
      </Form.Group>
    )
  }

  function ButtonSave() {
    return (
      <div className='d-flex justify-content-end pt-4'>
        <Button className='submit-button' variant='success' type='button' >Save</Button>
      </div>
    )
  }

  return (
    <Form className='form-profile-memorize'>
      {Name()}
      {Status()}
      <ButtonSave />
    </Form>
  )
}

export default ProfileForm
