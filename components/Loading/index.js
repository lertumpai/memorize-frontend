import React from 'react'
import Lottie from 'react-lottie'

import * as loading from '../../public/loading/loading.json'
import * as imageLoading from '../../public/loading/imageLoading.json'

const LoadingIndex = ({ height, width, mode = '' }) => {
  function getOptions() {
    let options = { loop:true, autoplay: true }
    switch (mode) {
      case 'image':
        options = {
          ...options,
          animationData: imageLoading.default,
        }
        break
      default:
        options = {
          ...options,
          animationData: loading.default,
        }
    }

    return options
  }

  return <Lottie options={getOptions()} height={height} width={width} />
}

export default React.memo(LoadingIndex)
