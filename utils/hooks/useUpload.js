import { useCallback, useState } from 'react'
import axios from 'axios'

import { STATUS_IDLE, STATUS_LOADING } from '../../store/status'

export function useUpload({ url, destination, setData }) {
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE)

  const onImageChange = useCallback(async e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setUploadStatus(STATUS_LOADING)

      const fd = new FormData()
      fd.append('image', selectedFile, selectedFile.name)
      fd.append('destination', destination)

      const response = await axios.post(url, fd, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      const { data } = response
      setData(data)

      setUploadStatus(STATUS_IDLE)
    }
  }, [url, setData, destination])

  const onUploadImage = useCallback(async image => {
    if (image) {
      setUploadStatus(STATUS_LOADING)

      const fd = new FormData()

      fd.append('image', image.blob, image.name)
      fd.append('destination', destination)

      const response = await axios.post(url, fd, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      const { data } = response
      setData(data)

      setUploadStatus(STATUS_IDLE)
    }
  }, [url, setData, destination])

  return {
    uploadStatus,
    onImageChange,
    onUploadImage,
  }
}
