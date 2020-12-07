import React from 'react'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loading from '../../public/loading/loading.json'

const options = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
}

const Loading = ({ height, width }) => {
  return (
    <FadeIn>
      <Lottie options={options} height={height} width={width} />
    </FadeIn>
  )
}

export default Loading
