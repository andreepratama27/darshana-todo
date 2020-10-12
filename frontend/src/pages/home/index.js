import React, { useContext, useEffect, useState } from 'react'
import Api from '../../api'

import { FAB, Navbar } from '../../components/atoms'
import { Modal, Card, Wrapper } from '../../components/molecules'
import { AuthContext } from '../../context/AuthContext'
import { TodoContext } from '../../context/TodoContext'
import { useTodo } from '../../hooks/todo.hooks'

const Home = () => {
  const [showFab, setShowFab] = useState(false)
  const [state] = useContext(TodoContext)

  const [selectedValue, setSelectedValue] = useState('')

  const [, { fetchTodo, onCheck }] = useTodo()

  useEffect(() => {
    fetchTodo()
  }, [])

  const handlePress = (item) => {
    onCheck(item)
  }

  const handleMenuPress = (item) => {
    setSelectedValue(item)
    setShowFab(true)
  }

  const handleFab = () => {
    setSelectedValue('')
    setShowFab(true)
  }

  return (
    <>
      <section className="p-4 w-1/2 mx-auto">
        {state.task.length ? (
          state.task.map((v, k) => (
            <Card
              onClick={() => handlePress(v)}
              onMenuPress={() => handleMenuPress(v)}
              key={k}
              selected={v.done}
              {...v}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center py-4">
            <img
              src={require('./../../images/no_data.svg')}
              className="w-64 h-64 object-contain"
            />

            <p className="mt-4 text-lg font-semibold">No task for today</p>
          </div>
        )}
      </section>

      <section className="absolute bottom-0 right-0 left-0 w-1/2 mx-auto">
        {!showFab && <FAB onClick={handleFab} />}
      </section>

      <Modal
        visible={showFab}
        value={selectedValue}
        onClose={() => setShowFab(false)}
      />
    </>
  )
}

export default Home
