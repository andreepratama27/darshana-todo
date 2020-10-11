import React from 'react'
import { IoIosAdd } from 'react-icons/io'

function FAB({ onClick }) {
  return (
    <button className='absolute bottom-0 right-0 m-4 bg-white w-12 h-12 shadow-lg flex items-center justify-center rounded-full z-10' onClick={onClick}>
      <IoIosAdd size={24} className='text-gray-700' />
    </button>
  )
}

export default FAB