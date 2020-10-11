import React, { useContext, useState } from 'react';
import './styles/tailwind.css';
import './App.css';

import { FAB } from './components/atoms'
import { Modal, Card } from './components/molecules'
import { Transition } from 'react-transition-group'
import { TodoContext } from './context/TodoContext'

function App() {
  const [showFab, setShowFab] = useState(false)
  const [state] = useContext(TodoContext)

  const [selectedValue, setSelectedValue] = useState('')

  const handlePress = item => {
    setSelectedValue(item)
    setShowFab(true)
  }

  return (
    <div className='w-full bg-gray-100 h-screen mx-auto'>
      <nav className='bg-red-500 text-center p-4'>
        <p className='text-white font-bold'>Brand</p>
      </nav>

      <section className='p-4'>
        {
          state.default.map((v, k) => (
            <Card onClick={() => handlePress(v)} key={k} selected={v.done} {...v} /> 
          ))
        }
      </section>

      {
        !showFab && (
          <FAB onClick={() => setShowFab(true)} />
        )
      }
      <Modal visible={showFab} value={selectedValue} onClose={() => setShowFab(false)} />
    </div>
  );
}

export default App;
