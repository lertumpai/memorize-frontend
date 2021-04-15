import { useCallback, useState } from 'react'
import axios from 'axios'

import { STATUS_IDLE, STATUS_LOADING } from '../../store/status'

export function useUpload({ url, destination, setData }) {
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE)

  const onUploadImage = useCallback(async (image, name) => {
    if (image) {
      setUploadStatus(STATUS_LOADING)

      const fd = new FormData()

      fd.append('image', image, name)
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
