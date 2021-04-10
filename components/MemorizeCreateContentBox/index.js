import React, { useState, useMemo, useCallback } from 'react'
import getConfig from 'next/config'
import { useSelector } from 'react-redux'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'
import InputImage from '../InputImage/dynamic'
import Image from '../Image/dynamic'

import { STATUS_LOADING } from '../../store/status'
import { useUpload } from '../../utils/hooks/useUpload'

import './style.scss'

const { publicRuntimeConfig } = getConfig()
const {
  SERVER_UPLOAD_IMAGE_PATH,
  SERVER_UPLOAD_IMAGE_PATH_ARTICLE,
  SERVER_URL,
} = publicRuntimeConfig

const MemorizeCreateContentBoxIndex = ({ id, articleId, content, setContent, onChange, onMemorize }) => {
  const [image, setImage] = useState(null)
  const [tempImage, setTempImage] = useState('')

  const auth = useSelector(state => state.auth)
  const { currentUser } = auth

  function onClickMemorize() {
    onMemorize({ id, content, image, articleId, setContent, setTempImage })
  }

  function MemorizeContentBox() {
    return (
      <TextAreaBox
        className='textarea-content-box-memorize'
        id='content'
        placeholder='Your post today ^^'
        value={content}
        onChange={onChange}
      />
    )
  }

  function MemorizeCreateButton() {
    const color = content ? 'green-memorize' : 'disable-memorize'
    const classNameButton = `button-create-content-memorize ${color}`
    return <Button onClick={onClickMemorize} className={classNameButton} value='Memorize' />
  }

  const url = useMemo(() => `${SERVER_URL}${SERVER_UPLOAD_IMAGE_PATH}`, [])
  const setData = useCallback(data => {
    setImage({
      destination: data.destination,
      fileName: data.fileName,
    })
    setTempImage(data.imageUrl)
  }, [])

  const { uploadStatus, onImageChange } = useUpload({
    url,
    setData,
    destination: SERVER_UPLOAD_IMAGE_PATH_ARTICLE,
  })

  function onClickImage() {
    document.getElementById('input-image-profile').click()
  }

  function MemorizeImage() {
    const classNameIcon = 'icon-upload-image-memorize fa fa-picture-o'
    return (
      <div className='container-form-upload-image-memorize' onClick={onClickImage}>
        <i className={classNameIcon} />
      </div>
    )
  }

  function MemorizeContentImage() {
    return tempImage || uploadStatus === STATUS_LOADING
      ? (
        <Image
          image={tempImage}
          className='image-create-content-box-memorize'
          status={uploadStatus}
        />
      ) : ''
  }

  function MemorizeCreateContentBox() {
    return (
      <div className='container-form-create-content-box-memorize'>
        <InputImage onChange={onImageChange} id='input-image-profile' />
        {MemorizeContentBox()}
        <div className='container-image-content-box-memorize'>
          {MemorizeContentImage()}
        </div>
        <div className='container-form-upload-create-memorize'>
          {!articleId ? MemorizeImage() : ''}
          <div className='container-create-content-button-memorize'>
            {MemorizeCreateButton()}
          </div>
        </div>
      </div>
    )
  }

  return MemorizeCreateContentBox()
}

export default React.memo(MemorizeCreateContentBoxIndex)
