var request = require('request')
var G       = require('../../../G')

var getDevices = (req, res) => {
	var token   = G.TOKEN.ACCESS_TOKEN
	const MAC   = G.MAC.C1000

	var options = {
		url: 'http://demo20.cassia.pro/api/gap/nodes?connection_state=connected&mac=' + MAC
				+ '&access_token=' + token,
		method: 'GET'
	}

	var getDevicesPromise = new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if(body){
				resolve(body)
			}
			else {
				reject(err)
			}
		})
	}).then(data => {
		var deviceList = JSON.parse(data)
		var isEmpty = Object.getOwnPropertyNames(deviceList.nodes).length === 0 ? true : false
		if(isEmpty) res.send('<h1>No devices connected.</h1>')
		else {
			var numOfDevices = deviceList.nodes.length
			res.send("<h1>There are " + numOfDevices + " devices connected.</h1>")
		}
	}, onFailure => {
		console.log(onFailure)
		res.send('Error.  Unable to search for connected devices.')
	})
}

module.exports = getDevices
