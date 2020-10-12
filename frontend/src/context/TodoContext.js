import React from 'react'
const { createContext, useReducer } = require('react')

const initialState = {
  task: [],
}

const TodoContext = createContext(initialState)

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_TODO': {
      return {
        ...state,
        task: action.payload,
      }
    }

    case 'ADD_TODO': {
      return {
        ...state,
        task: [...state.task, action.payload],
      }
    }

    case 'UPDATE_TODO': {
      const filterTask = state.task.findIndex(
        (v) => v._id === action.payload._id
      )
      const newTask = [...state.task]

      newTask[filterTask] = {
        ...newTask[filterTask],
        done: action.payload.done,
      }

      return {
        ...state,
        task: newTask,
      }
    }

    case 'UPDATE_TITLE': {
      const filterTask = state.task.findIndex(
        (v) => v._id === action.payload._id
      )
      const newTask = [...state.task]

      newTask[filterTask] = {
        ...newTask[filterTask],
        title: action.payload.title,
      }

      return {
        ...state,
        task: newTask,
      }
    }

    case 'DELETE_TODO': {
      const filteredTask = state.task.filter(
        (item) => item._id !== action.payload
      )

      return {
        ...state,
        task: filteredTask,
      }
    }

    default: {
      return state
    }
  }
}

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider }
