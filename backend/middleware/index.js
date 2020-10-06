const jwt = require('jsonwebtoken')
const secureRoute = (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined' && bearerHeader.length) {
    const bearer = bearerHeader.split(' ')[1]
    req.token = bearer
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  secureRoute
}