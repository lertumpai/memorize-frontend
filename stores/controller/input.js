import { useState } from 'react'

export const useInputChange = (init = {}) => {
  const [input, setInput] = useState(init)

  const handleInputChange = e => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value,
  })

  return [input, handleInputChange]
}
