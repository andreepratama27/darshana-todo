const { Schema, model } = require("mongoose")

const schema = Schema({
  title: String,
  userId: String,
  done: Boolean
})

module.exports = model("Todos", schema)