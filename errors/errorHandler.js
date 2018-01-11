//  Dependencies

var errorHandler = (err, req, res, next) => {
  console.log(err)
  next(err)
}

module.exports = errorHandler
