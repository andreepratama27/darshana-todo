import React from 'react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

function Card({ selected, task, onClick = () => {} }) {
  return (
    <div onClick={onClick} className='card shadow-md p-4 rounded-md bg-white flex justify-between items-center mb-4'>
      <p className={selected ? 'line-through text-gray-500' : ''}>
        {task}
      </p>
      {
        selected ? (
          <IoIosCheckmarkCircleOutline size={24} className='text-green-500' />
        ) : null
      }
    </div>
  )
}

export default Card