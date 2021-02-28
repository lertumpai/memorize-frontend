import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Datetime from 'react-datetime'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import getConfig from 'next/config'

import { STATUS_LOADING, STATUS_SUCCESS } from '../../store/status'
import { saveUser } from '../../utils/localStorage'
import { idleStateAuth, mutationProfile } from '../../store/auth/slice'
import { useUpload } from '../../utils/hooks/useUpload'

import Loading from '../../components/Loading/dynamic'
import TextBox from '../../components/TextBox/dynamic'
import TextAreaBox from '../../components/TextAreaBox/dynamic'
import Button from '../../components/Button/dynamic'
import Image from '../../components/Image/dynamic'
import ModalCropImage from '../../components/ModalCropImage/dynamic'

const { publicRuntimeConfig } = getConfig()
const {
  SERVER_UPLOAD_IMAGE_URL,
  SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH,
  SERVER_URL_IMAGE,
} = publicRuntimeConfig

import './style.scss'

const ProfileContainerIndex = () => {
  const [cropImageDisplay, setCropImageDisplay] = useState('hide')

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { currentUser, status } = auth

  const initialProfile = {
    name: currentUser?.profile?.name || '',
    status: currentUser?.profile?.status || '',
    birthday: currentUser?.profile?.birthday || moment(),
    image: currentUser?.profile?.image || 'avatar.svg',
  }
  const [profile, setProfile] = useState(initialProfile)

  const [image, setImage] = useState(null)

  useEffect(() => {
    if (status === STATUS_SUCCESS) {
      saveUser(currentUser)
      dispatch(idleStateAuth())
    }
  })

  function onSave() {
    dispatch(mutationProfile({ ...profile, image, id: currentUser?.id }))
  }

  function onProfileChange(e) {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  function onDateChange(date) {
    setProfile({ ...profile, birthday: date.toDate() })
  }

  const url = useMemo(() => `${SERVER_UPLOAD_IMAGE_URL}${SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH}`, [])
  const setData = useCallback(data => {
    setImage({
      destination: data.destination,
      uploadPath: data.uploadPath,
      fileName: data.fileName,
    })
    setProfile({
      ...profile,
      image: `${SERVER_URL_IMAGE}${data.urlImage}`,
    })
  }, [])

  const { uploadStatus, onUploadImage } = useUpload({ url, setData, currentUser })

  const onClickImage = useCallback(() => {
    setCropImageDisplay('')
  }, [])

  const onCancelUploadProfile = useCallback(fnReset => {
    fnReset()
    setCropImageDisplay('hide')
  }, [])

  const onSubmitUploadProfile = useCallback(async ({ fnReset, image }) => {
    if (image.name && image.blob) {
      await onUploadImage(image)
    }
    fnReset()
    setCropImageDisplay('hide')
  }, [onUploadImage])

  function ImageProfile() {
    return (
      <div className='container-profile-form-control-memorize'>
        <div className='container-profile-image-memorize'>
          <Image
            image={profile.image}
            status={uploadStatus}
            className='image-profile-memorize'
            onClick={onClickImage}
          />
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
        <ModalCropImage display={cropImageDisplay} onCancel={onCancelUploadProfile} onSubmit={onSubmitUploadProfile} />
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
