import React from 'react'
import { Router } from '@reach/router'

import Login from './login'
import Home from './home'

const GuestNavigator = () => {
  return (
    <Router>
      <Login path='/' />
    </Router>
  )
}

const AuthNavigator = () => (
  <Router>
    <Home path='/' />
  </Router>
)

export {
  GuestNavigator,
  AuthNavigator
}