import React from 'react'

import styles from '../styles'

const InputImageIndex = ({ onChange, id }) => {
  return <input
    className={styles.InputImage.inputImageMemorize}
    accept='image/*'
    id={id}
    type='file'
    onChange={onChange}
  />
}

export default React.memo(InputImageIndex)
