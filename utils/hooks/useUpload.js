import { useCallback, useState } from 'react'
import axios from 'axios'

import { STATUS_IDLE, STATUS_LOADING } from '../../store/status'

export function useUpload({ url, currentUser, setData }) {
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE)

  const onImageChange = useCallback(async e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setUploadStatus(STATUS_LOADING)

      const fd = new FormData()
      fd.append('photo', selectedFile, selectedFile.name)
      fd.append('userId', currentUser.id)

      const response = await axios.post(url, fd)
      const { data } = response
      setData(data)

      setUploadStatus(STATUS_IDLE)
    }
  }, [url, setData, currentUser])

  const onUploadImage = useCallback(async image => {
    if (image) {
      setUploadStatus(STATUS_LOADING)

      const fd = new FormData()
      fd.append('photo', image.blob, image.name)
      fd.append('userId', currentUser.id)

      const response = await axios.post(url, fd)
      const { data } = response
      setData(data)

      setUploadStatus(STATUS_IDLE)
    }
  }, [url, setData, currentUser])

  return {
    uploadStatus,
    onImageChange,
    onUploadImage,
  }
}
