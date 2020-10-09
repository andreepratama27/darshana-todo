const todo = require('express').Router()
const { secureRoute } = require('../middleware')
const jwt = require('jsonwebtoken')
const Todos = require('../models/Todos')

todo.get('/', secureRoute, async (req, res) => {
  const todos = await Todos.find()

  if (todos) {
    res.json({
      data: todos,
      message: ''
    })
  }
})

todo.post('/', secureRoute, async (req, res) => {
  try {
    const newTodos = new Todos(req.body)
    newTodos.userId = req.user._id

    await newTodos.save()

    res.json({
      data: newTodos,
      message: ''
    })

  } catch(e) {
    res.sendStatus(500)
  }
})

todo.put('/:id', secureRoute, async (req, res) => {
  try {
    const findTodo = Todos.findOne({ _id: req.params._id })

    res.json({
      data: findTodo,
      message: ''
    })
  }
})

todo.delete('/:id', secureRoute, async (req, res) => {})

module.exports = todo