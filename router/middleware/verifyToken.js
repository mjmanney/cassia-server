var verifyToken = (req, res, next) => {
  if(req.path == '/' ||
     req.path == 'public/src/libs/Skeleton-2.0.4/normalize.css' ||
	 req.path == 'public/src/libs/Skeleton-2.0.4/skeleton.css') {
		 return next()
	}
	
  var G = require('../../G')
  var token = G.TOKEN.ACCESS_TOKEN
  
  if(!token || token == '' || token == undefined) {
    console.log('No token found.  Login to obtain token.')
    res.render('authErr')
  }
  else {
    //console.log('Middleware sees token as: ' + token)
    next()
  }
}

module.exports = verifyToken
