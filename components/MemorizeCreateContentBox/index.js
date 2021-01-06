import React, { useState } from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'
import InputImage from '../InputImage/dynamic'
import Image from '../Image/dynamic'

import './style.scss'

const { publicRuntimeConfig } = getConfig()
const { SERVER_UPLOAD_IMAGE_URL, SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH } = publicRuntimeConfig

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

  async function onImageChange(e) {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const fd = new FormData()
      fd.append('photo', selectedFile, selectedFile.name)
      fd.append('userId', currentUser.id)

      const url = `${SERVER_UPLOAD_IMAGE_URL}${SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH}`
      const response = await axios.post(url, fd)
      const { data } = response
      setImage({
        destination: data.destination,
        uploadPath: data.uploadPath,
        fileName: data.fileName,
      })
      setTempImage(data.urlImage)
    }
  }

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
    return tempImage
      ? (
        <Image
          image={tempImage}
          className='image-create-content-box-memorize'
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
