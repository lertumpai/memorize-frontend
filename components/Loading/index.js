import React from 'react'
import Lottie from 'react-lottie'

import * as loading from '../../public/loading/loading.json'

const options = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
}

const Loading = ({ height, width }) => {
  return <Lottie options={options} height={height} width={width} />
}

export default React.memo(Loading)
