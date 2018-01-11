//
//  DEPENDENCIES
//
var express = require('express')
var request = require('request')
var router  = express.Router()

var G       = require('../../G')
var token   = G.TOKEN
//
//  TOKEN - TODO validate user input
//
var authenticate = (req, res) => {
  var credentials = {
    id: req.body.id,
    secret: req.body.secret
  }

  var options = {
    url: 'http://demo20.cassia.pro/api/oauth2/token',
    method: req.method,
    form: {
      'grant_type': 'client_credentials'
    },
    headers: {
      Authorization: 'Basic ' + new Buffer(credentials.id + ":" + credentials.secret, 'ascii').toString('base64')
    }
  }

  var promiseToken = new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      console.log('Requesting authentication token...')
      var data = JSON.parse(body)
      if (err || data.error) {
        var message = err || data.error_description
        reject(message)
      }
      else {
        resolve(data)
      }
    })
  }).then(authToken => {
    console.log('Success!')
    token.setToken(authToken)
    res.cookie('access_token', token.ACCESS_TOKEN)
    res.redirect('/')
  }, message => {
    console.log('Token request failed: ' + message)
    res.send(message)
  })
}

module.exports = authenticate
