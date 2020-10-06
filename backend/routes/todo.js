const todo = require('express').Router()
const { secureRoute } = require('../middleware')
const jwt = require('jsonwebtoken')
const Todos = require('../models/Todos')

todo.get('/', secureRoute, (req, res) => {
  jwt.verify(req.token, 'my_secret_key', async (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      console.log(data)
      const todos = await Todos.find()

      if (todos) {
        res.json({
          data: todos,
          message: ''
        })
      }
    }
  })
})

todo.post('/', secureRoute, async (req, res) => {
  try {
    const newTodos = new Todos(req.body)
    await newTodos.save()

    res.json({
      data: newTodos,
      message: ''
    })

  } catch(e) {
    res.sendStatus(500)
  }
})

module.exports = todo