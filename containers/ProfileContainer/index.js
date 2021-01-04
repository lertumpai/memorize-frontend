import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import getConfig from 'next/config'

import { STATUS_LOADING, STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, mutationProfile } from '../../store/auth/slice'

import Loading from '../../components/Loading/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import TextAreaBox from '../../components/TextAreaBox/dynamic'
import Button from '../../components/Button/dynamic'
import Image from '../../components/Image/dynamic'
import InputImage from '../../components/InputImage/dynamic'

const { publicRuntimeConfig } = getConfig()
const { SERVER_UPLOAD_IMAGE_URL, SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH } = publicRuntimeConfig

import './style.scss'

const ProfileContainerIndex = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { currentUser, status } = auth

  const initialProfile = {
    name: currentUser?.profile?.name || '',
    status: currentUser?.profile?.status || '',
    birthday: currentUser?.profile?.birthday || moment(),
    image: {
      urlImage: currentUser?.profile?.image || 'avatar.svg',
      destination: '',
      uploadPath: '',
      fileName: '',
    },
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

  async function onImageChange(e) {
    const selectedFile = e.target.files[0]
    const fd = new FormData()
    fd.append('photo', selectedFile, selectedFile.name)
    fd.append('userId', currentUser.id)

    const url = `${SERVER_UPLOAD_IMAGE_URL}${SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH}`
    const response = await axios.post(url, fd)
    const { data } = response
    setProfile({ ...profile, image: { ...data } })
  }

  function ImageProfile() {
    return (
      <div className='container-profile-form-control-memorize'>
        <div className='container-profile-image-memorize'>
          <Image
            image={profile.image.urlImage}
            className='image-profile-memorize'
          />
        </div>
        <div className='container-profile-image-input-memorize'>
          <InputImage onChange={onImageChange}/>
        </div>
      </div>
    )
  }

  function Name() {
    return (
      <div className='container-profile-form-control-memorize'>
        <div className='textbox-label-profile-memorize'>Name</div>
        <TextBox
          id='name'
          type='text'
          value={profile.name}
          onChange={onProfileChange}
        />
      </div>
    )
  }

  function Birthday() {
    const date = moment(profile.birthday)
    return (
      <div className='container-profile-form-control-memorize'>
        <div className='textbox-label-profile-memorize'>Birthday</div>
        <Datetime
          value={date}
          dateFormat='DD/MM/YYYY'
          timeFormat={false}
          onChange={onDateChange}
          onClose={onDateChange}
        />
      </div>
    )
  }

  function Status() {
    return (
      <div className='container-profile-form-control-memorize'>
        <div className='textbox-label-profile-memorize'>Status</div>
        <TextAreaBox
          id='status'
          value={profile.status}
          onChange={onProfileChange}
        />
      </div>
    )
  }

  function ButtonSave() {
    return (
      <div className='container-profile-form-control-memorize'>
        <Button className='button-memorize green-memorize' onClick={onSave} value='Update profile' />
      </div>
    )
  }

  function Saving() {
    return status === STATUS_LOADING ? <Loading height={400} /> : ''
  }

  function ProfileForm() {
    return (
      <>
        <div className='container-profile-form-memorize'>
          {ImageProfile()}
          {Name()}
          {Birthday()}
          {Status()}
          <ButtonSave />
        </div>
        <div className='container-profile-saving-memorize'>
          <Saving />
        </div>
      </>
    )
  }

  return (
    <div className='container-profile-memorize'>
      {ProfileForm()}
    </div>
  )
}

export default ProfileContainerIndex
