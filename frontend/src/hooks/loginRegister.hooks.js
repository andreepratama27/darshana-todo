import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Api from '../api'

export const useLoginRegister = ({ isRegister }) => {
  const [, dispatch] = useContext(AuthContext)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChange = ({ target }) => {
    const { name, value } = target

    setData(state => ({...state, [name]: value }))
  }

  const onSubmit = (evt) => {
    evt.preventDefault()

    if (isRegister) {
      return Api.register(data).then(resp => {
        console.log('success >> ', resp.data)
      }).catch(err => {
        console.log('error >> ', err)
      })
    }

    Api.login(data).then(resp => {
      const { token, user } = resp.data.data

      dispatch({
        type: 'SET_LOGIN',
        payload: {
          user,
          token
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return [{data}, {onChange, onSubmit}]
}