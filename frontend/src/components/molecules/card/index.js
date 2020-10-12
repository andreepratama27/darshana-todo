import React from 'react'
import { IoIosCheckmarkCircleOutline, IoMdMore } from 'react-icons/io'

function Radio({ id, onClick }) {
  return (
    <div className='checkbox-custom mr-2'>
      <input onClick={onClick} type='checkbox' name='checkbox' id={id} />
      <label for={id} className='border border-gray-500'></label>
    </div>
  )
}

function Card({
   _id,
   done,
   title,
   onClick = () => {},
   onMenuPress = () => {}
}) {
  return (
    <div className='card shadow-md p-4 rounded-md bg-white flex justify-between items-center mb-4 relative z-20'>
      <div className='w-full flex items-center'>
        {
          done ? (
            <IoIosCheckmarkCircleOutline onClick={onClick} size={24} className='text-green-500 mr-2' />
          ) : <Radio id={_id} onClick={onClick} />
        }
        <p className={done ? 'line-through text-gray-500' : ''}>
          {title}
        </p>
      </div>

      <IoMdMore onClick={onMenuPress} />
    </div>
  )
}

export default Card