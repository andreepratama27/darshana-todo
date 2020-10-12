import React, { createRef, forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} className='w-full bg-gray-100 py-2 px-4 border rounded mt-2' {...props} autoFocus />
  )
})

export default Input