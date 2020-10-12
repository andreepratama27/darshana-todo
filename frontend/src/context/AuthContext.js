import React from 'react'
import { createContext, useReducer } from 'react'

const initialState = {
  isLogin: false,
  token: localStorage.getItem('token') || '',
  user: []
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN': {
      localStorage.setItem('token', action.payload.token)

      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        user: action.payload.user
      }
    }

    default: {
      return state
    }
  }
}

const AuthContext = createContext(initialState)

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}