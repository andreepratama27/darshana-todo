import React, { useContext, useEffect, useState } from 'react'
import './styles/tailwind.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { AuthNavigator, GuestNavigator } from './pages/'
import { AuthContext } from './context/AuthContext'

function App() {
  const [state] = useContext(AuthContext)

  return state.token ? <AuthNavigator /> : <GuestNavigator />
}

export default App
