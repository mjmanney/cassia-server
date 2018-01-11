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

var connect      = require('../api/gap/nodes/connect')
var getDevices   = require('../api/gap/nodes/getDevices')
var writeInstruction    = require('../api/gatt/nodes/writeInstruction')

var G            = require('../G')
var token        = G.TOKEN.ACCESS_TOKEN
const MAC        = G.MAC.C1000 // E1000
//
// MIDDLEWARE
//
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(logRequest)
router.use('/api/gap/', verifyToken)
//
//  ROUTES
//
router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/index.html'))
      })

router.route('/api/authenticate')
      .get((req, res) => {
	       res.sendFile(path.join(__dirname, '../public/html/authenticate.html'))
       })
       .post(authenticate)

router.get('/api/gap/nodes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/api.html'))
})

router.get('/api/gap/nodes/scan',(req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/scan.html'))
})

router.post('/api/gap/nodes/connect', connect)

router.get('/api/gap/nodes/deviceList', getDevices)

router.get('/api/gatt/nodes/writeInstruction', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/writeInstruction.html'))
})
router.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/recieveData.html'))
})
router.get('/api/gatt/nodes/write', writeInstruction)
//
//  404 Error
//
router.get('*', notFound)

module.exports = router
