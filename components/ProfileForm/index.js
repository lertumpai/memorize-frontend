import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Datetime from 'react-datetime'
import moment from 'moment'

import Loading from '../Loading'
import { saveUser } from '../../utils/localStorage'
import { mutationProfile } from '../../store/auth/asyncThunk'
import { idleStateAuth } from '../../store/auth/slice'
import { STATUS_SUCCESS, STATUS_LOADING } from '../../store/status'
import './style.scss'

const ProfileForm = () => {
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
        <input className='profile-form-text-input-memorize' id='name' type='text' value={profile.name} onChange={onProfileChange} />
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
        <textarea className='profile-form-textarea-input-memorize' id='status' value={profile.status} onChange={onProfileChange} />
      </div>
    )
  }

  function ButtonSave() {
    return (
      <div className='profile-form-save-button-memorize'>
        <div className='profile-save-button-memorize' onClick={onSave} >Update profile</div>
      </div>
    )
  }

  function Saving() {
    return status === STATUS_LOADING ? <Loading height={400} /> : ''
  }

  return (
    <>
      <div className='profile-form-memorize'>
        {Name()}
        {Birthday()}
        {Status()}
        <ButtonSave />
      </div>
      <div className='profile-saving'>
        <Saving />
      </div>
    </>
  )
}

export default ProfileForm
