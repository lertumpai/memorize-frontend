import React, { useState, useMemo, useCallback } from 'react'
import getConfig from 'next/config'

import Button from '../Button/dynamic'
import TextAreaBox from '../TextAreaBox/dynamic'
import InputImage from '../InputImage/dynamic'
import Image from '../Image/dynamic'

import { STATUS_LOADING, STATUS_IDLE } from '../../store/status'
import { useUpload } from '../../utils/hooks/useUpload'

import styles from '../styles'

const { publicRuntimeConfig } = getConfig()
const {
  SERVER_UPLOAD_IMAGE_PATH,
  SERVER_UPLOAD_IMAGE_PATH_ARTICLE,
  SERVER_UPLOAD_URL,
} = publicRuntimeConfig

const MemorizeCreateContentBoxIndex = ({ id, articleId, content, setContent, onChange, onMemorize }) => {
  const [image, setImage] = useState(null)
  const [tempImage, setTempImage] = useState('')

  function resetImageState() {
    setImage(null)
    setTempImage('')
  }

  function onClickMemorize() {
    onMemorize({ id, content, image, articleId, setContent, setTempImage })
    resetImageState()
  }

  function MemorizeContentBox() {
    return (
      <TextAreaBox
        className={styles.TextAreaBox.textareaContentBoxMemorize}
        id='content'
        placeholder='Your post today ^^'
        value={content}
        onChange={onChange}
      />
    )
  }

  const url = useMemo(() => `${SERVER_UPLOAD_URL}${SERVER_UPLOAD_IMAGE_PATH}`, [])
  const setData = useCallback(data => {
    setImage({
      destination: data.destination,
      fileName: data.fileName,
    })
    setTempImage(data.imageUrl)
  }, [])

  const { uploadStatus, onUploadImage } = useUpload({
    url,
    setData,
    destination: SERVER_UPLOAD_IMAGE_PATH_ARTICLE,
  })

  function MemorizeCreateButton() {
    const color = content && uploadStatus === STATUS_IDLE ? 'green-memorize' : 'disable-memorize'
    const classNameButton = `${styles.Button.buttonCreateContentMemorize} ${color}`
    return <Button onClick={onClickMemorize} className={classNameButton} value='Memorize' />
  }

  function onClickImage() {
    document.getElementById('input-image-profile').click()
  }

  const onImageChange = useCallback(async e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      await onUploadImage(selectedFile, selectedFile.name)
    }
  }, [])

  function MemorizeImage() {
    const classNameIcon = `${styles.MemorizeCreateContentBox.iconUploadImageMemorize} fa fa-picture-o`
    return (
      <div className={styles.MemorizeCreateContentBox.containerFormUploadImageMemorize} onClick={onClickImage}>
        <i className={classNameIcon} />
      </div>
    )
  }

  function MemorizeContentImage() {
    return tempImage || uploadStatus === STATUS_LOADING
      ? (
        <Image
          image={tempImage}
          className={styles.Image.imageCreateContentBoxMemorize}
          status={uploadStatus}
        />
      ) : ''
  }

  function MemorizeCreateContentBox() {
    return (
      <div className={styles.MemorizeCreateContentBox.containerFormCreateContentBoxMemorize}>
        <InputImage onChange={onImageChange} id='input-image-profile' />
        {MemorizeContentBox()}
        <div className={styles.MemorizeCreateContentBox.containerImageContentBoxMemorize}>
          {MemorizeContentImage()}
        </div>
        <div className={styles.MemorizeCreateContentBox.containerFormUploadCreateMemorize}>
          {!articleId ? MemorizeImage() : ''}
          <div className={styles.MemorizeCreateContentBox.containerCreateContentButtonMemorize}>
            {MemorizeCreateButton()}
          </div>
        </div>
      </div>
    )
  }

  return MemorizeCreateContentBox()
}

export default React.memo(MemorizeCreateContentBoxIndex)
