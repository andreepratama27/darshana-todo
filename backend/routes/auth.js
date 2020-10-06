const auth = require('express').Router()
const { secureRoute } = require('../middleware')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

auth.post('/register', (req, res) => {
  try {
    const users = new Users(req.body)
    users.password = bcrypt.hashSync(req.body.password, 10)
    users.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err
        })
      }

      users.password = undefined

      return res.json({
        data: user,
        message: ''
      })
    })
  } catch(e) {
    res.sendStatus(400)
  }
})

auth.post('/login', (req, res) => {
  Users.findOne({ email: req.body.email }, (err, user) => {
    const comparePass = bcrypt.compareSync(req.body.password, user.password)

    if (err) res.status(400).send(err)

    if (!user || !comparePass) {
      return res.json({
        data: [],
        message: 'Email not valid'
      })
    }

    res.json({
      data: {
        token: jwt.sign({ user }, process.env.SECRET_KEY),
        user
      },
      message: ''
    })

    // if (user.comparePassword2(req.body.password)) {
    //   return res.json({
    //     data: user,
    //     message: ''
    //   })
    // } else {
    //   return res.json({
    //     data: [],
    //     message: 'Pasword not valid'
    //   })
    // }

    // user.comparePassword(req.body.password, (err, isMatch) => {
    //   if (!isMatch) return res.json({ message: 'Password failed'})
      
    //   return res.json({
    //     data: user,
    //     message: 'Success'
    //   })
    // })
  })
  // try {
  //   const findUser = await Users.findOne({ email: req.body.email })

  //   if (findUser) {
  //     res.json({
  //       data: findUser,
  //       message: ''
  //     })
  //   } else {
  //     res.json({
  //       data: [j],
  //       message: ''
  //     })
  //   }
  // } catch(err) {
  //   res.sendStatus(401).json({
  //     data: [],
  //     message: err,
  //   })
  // }
  // Users.findOne({ email: req.body.email }).then((user) => {
  //   return res.json({
  //     data: user,
  //   }).catch(err => {
  //     throw err
  //   })
    // if (err) throw err
    // if (!user || !user.comparePassword(req.body.password)) {
    //   return res.sendStatus(401).json({
    //     message: 'Authentication failed. Invalid user or password'
    //   })
    // }

    // return res.json({
    //   token: jwt.sign({ user }),
    //   message: ''
    // })
  // })
  // if (findUser) {
  //   const token = jwt.sign({ user: findUser }, process.env.DATABASE_KEY)

  //   res.json({
  //     data: {
  //       token
  //     },
  //     message: ''
  //   })

  //   return
  // }

  // res.sendStatus(404)
})

auth.get('/me', secureRoute, (req, res) => {
  jwt.verify(req.token, 'process.env.DATABASE_KEY', (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        data
      })
    }
  })
})

module.exports = auth