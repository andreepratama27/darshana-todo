import React, { useState, useContext, useEffect, createRef } from 'react'
import { Transition } from 'react-transition-group'
import { IoIosCloseCircleOutline, IoIosTrash, IoIosSave } from 'react-icons/io'
import { TodoContext } from '../../../context/TodoContext'
import { Input } from '../../atoms' 
import { useTodo } from '../../../hooks/todo.hooks'

function Modal({ value, visible, onClose }) {
  const duration = 300
  const inputRef = createRef(null)

  const [selected, setSelected] = useState()
  const [, { onAddTask, onDeleteTask, onChangeTitle }] = useTodo()

  useEffect(() => { 
    setSelected(value)
  }, [value])

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }

  const transitionStyles = {
    entering: {opacity: 1, zIndex: 30},
    entered: {opacity: 1, zIndex: 30},
    exiting: {opacity: 0, zIndex: 0},
    exited: {opacity: 0, zIndex: 0},
  }

  const handleChangeTask = ({ target, keyCode }) => {
    if (keyCode === 13) {
      if (selected._id) {
        onChangeTitle(selected, target.value)
        onClose()
        return
      }

      onAddTask({
        title: target.value,
        done: false
      })

      onClose()
    }
  }

  const onSave = () => {
    if (selected._id) {
      onChangeTitle(selected, inputRef.current?.value)
      onClose()
      return
    }

    onAddTask({
      title: inputRef.current?.value,
      done: false
    })

    onClose()
  }

  const onDelete = () => {
    onDeleteTask(value)
    onClose()
  }

  const handleClose = () => {
    onClose()
    setSelected(null)
  }

  return (
    <Transition in={visible} timeout={duration}>
      {state => (
        <div className='p-4 bg-white absolute bottom-0 shadow-md border-t rounded-t-lg w-1/2 right-0 left-0 mx-auto'
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <button onClick={handleClose} className='absolute top-0 flex justify-center items-center right-0 w-8 h-8 bg-red-500 rounded-full' style={{ top: -20 }}>
            <IoIosCloseCircleOutline className='text-white' size={20} />
          </button>
          <p className='mb-2'>Add new task</p>

          <div className='flex flex-row justify-center items-center'>
            <Input ref={inputRef} placeholder="Type your task here" className='w-full bg-gray-100 py-2 px-4 border rounded mt-2' onKeyUp={handleChangeTask} autoFocus />
          </div>

          <div className='w-full my-2 mt-4 flex flex-row justify-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-red-700 rounded-md mr-3' onClick={onDelete}>
              <IoIosTrash className='text-white' />
            </button>

            <button className='w-8 h-8 flex items-center justify-center bg-blue-700 rounded-md' onClick={onSave}>
              <IoIosSave className='text-white' />
            </button>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default Modal