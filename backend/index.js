const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
const authRoute = require('./routes/auth')
const todoRoute = require('./routes/todo')

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }).then(() => {
  app.use('/auth', authRoute)
  app.use('/todo', todoRoute)

  app.listen(port, () => {
    console.log('server running')
  })
})
