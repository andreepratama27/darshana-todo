const bcrypt = require('bcrypt')
const { Schema, model } = require("mongoose")

const Users = new Schema({
  name: String,
  email: String,
  password: String
})

Users.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

Users.methods.comparePassword2 = (candidatePassword) => {
  return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = model("Users", Users)