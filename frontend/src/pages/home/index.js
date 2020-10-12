import React, { useContext, useEffect, useState } from 'react';
import Api from '../../api';

import { FAB, Navbar } from '../../components/atoms'
import { Modal, Card } from '../../components/molecules'
import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext'
import { useTodo } from '../../hooks/todo.hooks';

const Home = () => {
  const [showFab, setShowFab] = useState(false)
  const [state] = useContext(TodoContext)

  const [selectedValue, setSelectedValue] = useState('')

  const [, {fetchTodo, onCheck}] = useTodo()

  useEffect(() => {
    fetchTodo()
  }, [])

  const handlePress = item => {
    onCheck(item)
  }

  const handleMenuPress = item => {
    setSelectedValue(item)
    setShowFab(true)
  }

  const handleFab = () => {
    setSelectedValue('')
    setShowFab(true)
  }

  return (
    <>
      <div className='w-full bg-gray-100 h-screen mx-auto'>
        <Navbar />

        <section className='p-4 w-1/2 mx-auto'>
          {
            state.task.map((v, k) => (
              <Card
                onClick={() => handlePress(v)}
                onMenuPress={() => handleMenuPress(v)}
                key={k}
                selected={v.done}
                {...v} /> 
            ))
          }
        </section>

        <section className='absolute bottom-0 right-0 left-0 w-1/2 mx-auto'>
          {
            !showFab && (
              <FAB onClick={handleFab} />
            )
          }
        </section>


      </div>

      <Modal
        visible={showFab}
        value={selectedValue}
        onClose={() => setShowFab(false)} />
    </>
  );
}

export default Home
