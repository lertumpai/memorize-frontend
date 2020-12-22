import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { STATUS_LOADING, STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, mutationProfile } from '../../store/auth/slice'

import Loading from '../../components/Loading/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import TextAreaBox from '../../components/TextAreaBox/dynamic'
import Button from '../../components/Button/dynamic'

import './style.scss'

const Index = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { currentUser, status } = auth

  const initialProfile = {
    name: currentUser?.profile?.name || '',
    status: currentUser?.profile?.status || '',
    birthday: currentUser?.profile?.birthday || moment(),
  }
  const [profile, setProfile] = useState(initialProfile)

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      saveUser(currentUser)
      dispatch(idleStateAuth())
    }
  })

  function onSave() {
    dispatch(mutationProfile({ ...profile, id: currentUser?.id }))
  }

  function onProfileChange(e) {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  function onDateChange(date) {
    setProfile({ ...profile, birthday: date.toDate() })
  }

  function Name() {
    return (
      <div className='profile-form-control-input-memorize'>
        <div className='profile-form-label-input-memorize'>Name</div>
        <TextBox id='name' type='text' value={profile.name} onChange={onProfileChange} />
      </div>
    )
  }

  function Birthday() {
    const date = moment(profile.birthday)
    return (
      <div className='profile-form-control-input-memorize'>
        <div className='profile-form-label-input-memorize'>Birthday</div>
        <Datetime className='profile-form-date-picker-memorize' value={date} dateFormat='DD/MM/YYYY' timeFormat={false} onChange={onDateChange} onClose={onDateChange} />
      </div>
    )
  }

  function Status() {
    return (
      <div className='profile-form-control-input-memorize'>
        <div className='profile-form-label-input-memorize'>Status</div>
        <TextAreaBox id='status' value={profile.status} onChange={onProfileChange} />
      </div>
    )
  }

  function ButtonSave() {
    return (
      <div className='profile-form-save-button-memorize'>
        <Button className='profile-save-button-memorize' onClick={onSave} value='Update profile' />
      </div>
    )
  }

  function Saving() {
    return status === STATUS_LOADING ? <Loading height={400} /> : ''
  }

  function ProfileForm() {
    return (
      <>
        <div className='profile-form-memorize'>
          {Name()}
          {Birthday()}
          {Status()}
          <ButtonSave />
        </div>
        <div className='profile-saving-memorize'>
          <Saving />
        </div>
      </>
    )
  }

  return (
    <div className='profile-container-memorize'>
      {ProfileForm()}
    </div>
  )
}

export default Index