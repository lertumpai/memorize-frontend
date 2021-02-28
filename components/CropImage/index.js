import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'

import InputImage from '../InputImage/dynamic'

import './style.scss'

function generateImage(canvas) {
  return canvas
    ? new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/jpeg'))
    : null
}

const CropImageIndex = ({ className = '', onSubmit }) => {
  const [upImg, setUpImg] = useState(null)
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({ width: 300, height: 300, aspect: 1 })
  const [completedCrop, setCompletedCrop] = useState(null)

  function onClickImage() {
    document.getElementById('input-image-profile').click()
  }

  const onSelectFile = useCallback(e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }, [])

  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    // scaleX and scaleY are the ratio of originalWidth/width and originalHeight/height respectively
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
  }, [completedCrop])

  function IconUploadImage() {
    const classNameIcon = 'fa fa-picture-o icon-crop-image-upload-memorize'
    return (
      <div className='container-crop-image-icon-upload-memorize' onClick={onClickImage}>
        <i className={classNameIcon} />
      </div>
    )
  }

  function CanvasCropImage() {
    return (
      <div className='container-canvas-crop-image-memorize'>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={c => setCrop(c)}
          onComplete={c => setCompletedCrop(c)}
          locked={true}
        />
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            display: 'none',
          }}
        />
      </div>
    )
  }

  function CropImage() {
    return (
      <>
        <InputImage onChange={onSelectFile} id='input-image-profile' />
        {upImg ? CanvasCropImage() : IconUploadImage()}
      </>
    )
  }

  return CropImage()
}

export default React.memo(CropImageIndex)
