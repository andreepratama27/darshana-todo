import React from 'react'
import { Router } from '@reach/router'

import Login from './login'

import Home from './home'
import Profile from './profile'
import { Wrapper } from '../components/molecules'

const GuestNavigator = () => {
  return (
    <Router>
      <Login path="/" />
    </Router>
  )
}

const AuthNavigator = () => (
  <Wrapper>
    <Router>
      <Home path="/" />
      <Profile path="/profile" />
    </Router>
  </Wrapper>
)

export { GuestNavigator, AuthNavigator }
