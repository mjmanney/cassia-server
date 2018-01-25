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
		var dl = JSON.parse(data)
		var nod = dl.nodes.length

		res.render('deviceList', {
			deviceList: dl,
			numOfDevice: nod
		})
		
		/*
		var deviceList = JSON.parse(data)
		var isEmpty = Object.getOwnPropertyNames(deviceList.nodes).length === 0 ? true : false
		if(isEmpty) res.send('<h1>No devices connected.</h1>')
		else {
			var numOfDevices = deviceList.nodes.length
			var str          = "<h1>There are " + numOfDevices + " devices connected. </h1>"
			var list         = ""
			for(var i = 0; i < numOfDevices; i++){
				
				var mac = deviceList.nodes[i].bdaddrs.bdaddr
				var formWrapper  = "<form action='/api/disconnect' method='get'><input id='mac' type='text' name='mac' value='" + mac + "'><input id='disconnectBtn' type='submit' name='submit' value='Disconnect'></form>"
				list += "<li>" + formWrapper + "</li>"
			}
			res.send(str + "<br><ul>" + list + "</ul>")
		}
		*/
	}, onFailure => {
		console.log(onFailure)
		res.send('Error.  Unable to search for connected devices.')
	})
}

module.exports = getDevices
