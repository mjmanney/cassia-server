//
//  DEPENDENCIES
//
var express      = require('express')
var request      = require('request')
var path         = require('path')
var bodyParser   = require('body-parser')

var app          = express()
var router       = express.Router()

var notFound     = require('../errors/notFound')

var authenticate = require('./middleware/authenticate')
var verifyToken  = require('./middleware/verifyToken')
var logRequest   = require('./middleware/logRequest')

var connect      = require('../api/init')
var disconnect   = require('../api/gap/nodes/disconnect')
var getDevices   = require('../api/gap/nodes/getDevices')


var G            = require('../G')
var token        = G.TOKEN.ACCESS_TOKEN
const MAC        = G.MAC.C1000 // E1000
//
// MIDDLEWARE
//
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(logRequest)
router.use('/', verifyToken)
//
//  ROUTES
//
router.route('/')
      .get((req, res) => {
        res.render('login')
      })
      .post(authenticate)

router.get('/index', (req, res) => {
  res.render('index')
})

/*
router.get('/api/index', (req, res) => {
  res.render('index')
})

*/

/*
router.get('/api/gap/nodes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/api.html'))
})
*/

router.get('/api/search',(req, res) => {
  res.render('searchKDC')
  //res.sendFile(path.join(__dirname, '../public/html/scan.html'))
})

router.post('/api/connect', connect)

router.get('/api/disconnect', disconnect)

router.get('/api/deviceList', getDevices)

router.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/recieveData.html'))
})

//
//  404 Error
//
router.get('*', notFound)

module.exports = router
