import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import _ from 'lodash'
import Datetime from 'react-datetime'
import moment from 'moment'

import { saveProfile } from '../../store/auth/asyncThunk'
import './style.scss'

const ProfileForm = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { currentUser } = auth

  const initialProfile = {
    name: _.get(currentUser, 'profile.name'),
    status: _.get(currentUser, 'profile.status'),
    birthday: _.get(currentUser, 'profile.birthday'),
  }
  const [profile, setProfile] = useState(initialProfile)

  useEffect(() => {

  })


  function onSave() {
    dispatch(saveProfile({ ...profile, id: _.get(currentUser, 'id') }))
  }

  function onProfileChange(e) {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  function onDateChange(date) {
    setProfile({ ...profile, birthday: date.toDate() })
  }

  function Name() {
    return (
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' value={profile.name} onChange={onProfileChange} />
      </Form.Group>
    )
  }

  function Birthday() {
    const date = moment(profile.birthday).format('DD/MM/YYYY')
    return (
      <Form.Group controlId='birthday' className='pt-3'>
        <Form.Label>Birthday</Form.Label>
        <Datetime value={date} dateFormat='DD/MM/YYYY' timeFormat={false} onChange={onDateChange} onClose={onDateChange} />
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
        <Button className='submit-button' variant='success' type='button' onClick={onSave} >Save</Button>
      </div>
    )
  }

  return (
    <Form className='form-profile-memorize'>
      {Name()}
      {Birthday()}
      {Status()}
      <ButtonSave />
    </Form>
  )
}

export default ProfileForm
