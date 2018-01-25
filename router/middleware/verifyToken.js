var verifyToken = (req, res, next) => {
  if(req.path == '/') return next()
	
  var G = require('../../G')
  var token = G.TOKEN.ACCESS_TOKEN
  
  if(!token || token == '' || token == undefined) {
    console.log('Access token is required to make API calls.')
    res.send('Access token is required to make API calls.')
  }
  else {
    console.log('Middleware sees token as: ' + token)
    next()
  }
}

module.exports = verifyToken
