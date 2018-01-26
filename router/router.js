//
//  DEPENDENCIES
//
var express      = require('express')
var request      = require('request')
var path         = require('path')
var bodyParser   = require('body-parser')

var app          = express()
var router       = express.Router()

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
router.get('/', (req, res) => { res.render('login') })
router.post('/', authenticate)

router.get('/index', (req, res) => { res.render('index') })

router.get('/api/search',(req, res) => { res.render('searchKDC') })

router.get('/api/connect', (req, res) => { res.render('notificationCenter') })
router.post('/api/connect', connect)

router.get('/api/disconnect', disconnect)

router.get('/api/deviceList', getDevices)

router.get('*', (req, res) => { res.render('404') })

module.exports = router
