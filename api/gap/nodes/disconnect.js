var request = require('request')
var G       = require('../../../G')

var disconnect = (req, res) => {
  var token   = G.TOKEN.ACCESS_TOKEN
  const MAC   = G.MAC.C1000

 
  var node = req.query.mac
  
    var options = {
    url: 'http://demo20.cassia.pro/api/gap/nodes/' + node
          + '/connection?mac=' + MAC
          + '&access_token=' + token,
    method: 'DELETE'
	
	/*
	form: {
		// Bluetooth address type
		type: 'random'
	}
	*/
  }
  
  var disconnectPromise = new Promise((resolve, reject) => {
    console.log('Terminating connection to KDC: ' + node)
    request(options, (err, res, body) => {
      if(err){
        reject(err || body)
      } else {
        resolve(body)
      }
    })
  }).then(onSuccess => {
    console.log('Disconnected ' + onSuccess)
    res.status(200).send('KDC is disconnected')
  }, onFailure => {
    console.log('Failed to disconnect: ' + onFailure)
    res.status(500).send('An error occured.')
  })
}

module.exports = disconnect