var logRequest = (req, res, next) => {
  console.log('Server recieved the followng request: ' + req.method + ' ' + req.url)
  next()
}

module.exports = logRequest
