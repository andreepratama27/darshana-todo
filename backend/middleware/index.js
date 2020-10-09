const jwt = require('jsonwebtoken')

const verifyJwt = (token, cb) => {
  jwt.verify(token, process.env.SECRET_KEY, cb)
}
const secureRoute = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined' && bearerHeader.length) {
    const bearer = bearerHeader.split(' ')[1]
    verifyJwt(bearer, (err, {user}) => {
      if (err) res.sendStatus(403)
      req.token = bearer
      req.user = user
      next()
    })
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  secureRoute
}