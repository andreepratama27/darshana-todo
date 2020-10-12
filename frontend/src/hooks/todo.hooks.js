import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { TodoContext } from '../context/TodoContext'
import Api from '../api'

export const useTodo = props => {
  const [state] = useContext(AuthContext)
  const [, dispatch] = useContext(TodoContext)

  const fetchTodo = async () => {
    try {
      const response = await Api.getTodo(state.token)
      dispatch({ type: 'INIT_TODO', payload: response.data.data })
    } catch(e) {
      console.log('error >> ', e)
    }
  }

  const onAddTask = async (item) => {
    try {
      const response = await Api.postTodo(state.token, item)

      dispatch({ type: 'ADD_TODO', payload: response.data.data })
    } catch(e) {
      console.log('error >> ', e)
    }
  }

  const onDeleteTask = async (item) => {
    dispatch({ type: 'DELETE_TODO', payload: item._id})

    try {
      const response = await Api.deleteTodo(state.token, {id: item._id})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }

  const onCheck = async (item) => {
    dispatch({ type: 'UPDATE_TODO', payload: {...item, done: !item.done}})

    try {
      await Api.updateTodo(state.token, {id: item._id, done: !item.done})
    } catch(err) {
      console.log(err)
    }
  }

  const onChangeTitle = async (item, title) => {
    dispatch({ type: 'UPDATE_TITLE', payload: {...item, title}})

    try {
      await Api.updateTodo(state.token, {id: item._id, title})
    } catch(err) {
      console.log(err)
    }
  }

  return [null, { onAddTask, onDeleteTask, onCheck, onChangeTitle, fetchTodo }]
}