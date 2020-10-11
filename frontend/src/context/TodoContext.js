import React from 'react'
const { createContext, useReducer } = require("react");

const initialState = {
  default: [
    { task: 'Andre Pratama', done: false},
    { task: 'Ayo daftar UIN', done: true},
    { task: 'Ayo denger Peterese', done: false},
  ],
  finished: []
}

export const TodoContext = createContext(initialState)

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        default: [...state.default, action.payload]
      }
    }

    default: {
      return state
    }
  }
}

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return(
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  )
}

export {
  TodoProvider
}