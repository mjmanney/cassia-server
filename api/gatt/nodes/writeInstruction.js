var request = require('request')
var G       = require('../../../G')

// Write Instruction

var writeInstruction = (req, res) => {
  const MAC = G.MAC.C1000
  var token = G.TOKEN.ACCESS_TOKEN

  var options = {
    url: 'http://demo20.cassia.pro/api/gatt/nodes/' + 'CD:A6:84:F9:68:D8' //Programaticlly insert node
          + '/handle/19/value/0100/?'
          + 'mac=' + MAC
          + '&access_token=' + token,
    method: 'GET'
  }

  var writePromise = new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(err) reject(err)
      else resolve(body)
    })
  }).then(onSuccess => {
    console.log("WRITE INSTRUCTION: " + onSuccess)
    res.end()
  }, onFailure => {
    console.log("Something went wrong: " + onFailure)
    res.end()
  })
}


module.exports = writeInstruction
