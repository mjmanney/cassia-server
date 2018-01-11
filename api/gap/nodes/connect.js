var request = require('request')
var G       = require('../../../G')

var connect = (req, res) => {
  var token   = G.TOKEN.ACCESS_TOKEN
  const MAC   = G.MAC.C1000

  var node = req.body.mac

  var options = {
    url: 'http://demo20.cassia.pro/api/gap/nodes/' + node
          + '/connection?mac=' + MAC
          + '&access_token=' + token,
    method: 'POST',
	form: {
		// Bluetooth address type
		type: 'random'
	}
  }

  var connectPromise = new Promise((resolve, reject) => {
    console.log('Requesting connection to KDC: ' + node)
    request(options, (err, res, body) => {
      if(err || body == 'Not found' || body == 'connect failed or timeout'){
        reject(err || body)
      } else {
        resolve(body)
      }
    })
  }).then(onSuccess => {
    console.log('Connected: ' + onSuccess)
    res.status(200).send('KDC is connected')
  }, onFailure => {
    console.log('Failed to connect: ' + onFailure)
    res.status(500).send('An error occured.')
  })
}

module.exports = connect
