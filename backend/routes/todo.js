const todo = require("express").Router()
const { secureRoute } = require("../middleware")
const Todos = require("../models/Todos")
const jwt = require("jsonwebtoken")

todo.get("/", secureRoute, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Todos.find({ userId: data.user._id })
        .then((user) => {
          res.json({
            data: user,
          })
        })
        .catch((err) => {
          res.status(404).json({
            err,
            message: "Task not found",
          })
        })
    }
  })
})

todo.get("/:id", secureRoute, async (req, res) => {
  try {
    const todo = await Todos.findOne({ _id: req.params.id })

    res.status(200).json({
      data: todo,
      message: "",
    })
  } catch (err) {
    res.status(404)
    res.json({
      error: err,
      message: "Task not found",
    })
  }
})

todo.post("/", secureRoute, async (req, res) => {
  try {
    const newTodos = new Todos(req.body)
    newTodos.userId = req.user._id
    newTodos.done = false

    await newTodos.save()

    res.json({
      data: newTodos,
      message: "",
    })
  } catch (err) {
    res.status(403)
    res.json({
      error: err,
      message: "Cannot add task",
    })
  }
})

todo.put("/:id", secureRoute, (req, res) => {
  const findTask = Todos.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, task) => {
      if (err) return res.status(404).json({ message: "error not found" })

      res.send("Product updated")
    }
  )
})

// todo.patch('/:id', secureRoute, async (req, res) => {
//   try {
//     const todo = await Todos.findOne({ _id : req.params.id})

//     if (req.body.title) {
//       todo.title = req.body.title
//     }

//     await Todos.save()

//     res.json({
//       data: todo,
//       message: ''
//     })

//     // if (req.body.done) {
//     //   todo.done = req.body.done
//     // }

//     // await Todos.save()
//     // res.send(post)
//   } catch(e){
//     res.send({ error: 'Task bang doesnt exist' })
//   }
// })

todo.delete("/:id", secureRoute, async (req, res) => {
  try {
    const findTodo = await Todos.findOne({ _id: req.params.id })

    await Todos.deleteOne({ _id: req.params.id })

    res.status(204).json({
      data: findTodo,
      message: "Data berhasil di hapus",
    })
  } catch (e) {
    res.status(404).send({ error: "Task doesnt exist" })
  }
})

module.exports = todo
