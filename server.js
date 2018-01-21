//
//  DEPENDENCIES
//
var express      = require('express')
var bodyParser   = require('body-parser')
var http         = require('http')
var path         = require('path')

var app          = express()
var router       = require('./router/router')

const G          = require('./G')
const PORT       = G.PORT
const MAC        = G.MAC.C1000 //E1000
//
//  TEMPLATE ENGINE
//
app.set('views', path.join(__dirname, 'views') )
app.set('view engine', 'pug')
//
//  MIDDLEWARE
//
app.use(express.static('public'))
app.use('/', router)
//
//  START SERVER
//
app.listen(PORT, '0.0.0.0', () => {
	console.log('Node server listening for requests on port ' + PORT)
})
