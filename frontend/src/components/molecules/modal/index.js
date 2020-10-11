import React, { useState, useContext, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { TodoContext } from '../../../context/TodoContext'

function Modal({ value, visible, onClose }) {
  const duration = 300
  const [selected, setSelected] = useState()
  const [, dispatch] = useContext(TodoContext)

  useEffect(() => { 
    setSelected(value)
  }, [value])

  console.log('value >> ', value)

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }

  const transitionStyles = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
  }

  const handleChangeTask = ({ target, keyCode }) => {
    if (keyCode === 13) {
      dispatch({ type: 'ADD_TODO', payload: {
        task: target.value,
        done: false
      }})

      onClose()
    }
  }

  // React.useEffect(() => {
  //   if (visible) {
  //     setShow(visible)
  //   }
  // }, [visible])

  // if (show) {

  console.log(selected)
    return (
      <Transition in={visible} timeout={duration}>
        {state => (
          <div className='w-full p-4 bg-white absolute bottom-0 shadow-md border-t rounded-t-lg'
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <p className='mb-2'>Add new task</p>

            <div className='flex flex-row justify-center items-center'>
              <input value={selected?.task} placeholder="Type your task here" className='w-full bg-gray-100 py-2 px-4 border rounded mt-2' onKeyDown={handleChangeTask} autoFocus />

              <button onClick={onClose} className='flex flex-row justify-end items-center w-10 mt-2 py-2 outline-none focus:outline-none'>
                <IoIosCloseCircleOutline size={24} className='text-red-500' />
              </button>
            </div>
          </div>
        )}
      </Transition>
    )
  // }
}

export default Modal