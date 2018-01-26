const MAC  = 'CC:1B:E0:E0:5F:E0'

function cookieParser(cookie) {
  var result = {}
  var c = cookie.split(';')
  var len = c.length

  for(var i = 0; i < len; i++) {
    var subArr = c[i].split('=')
    result[subArr[0]] = subArr[1]
  }

  return result
}

var cookieObj = cookieParser(document.cookie)
var tokenFromCookie = cookieObj[' access_token']

var mac        = document.getElementById('mac')
var ul         = document.getElementById('log')
var closeBtn   = document.getElementById('closeBtn')
var connectBtn = document.getElementById('connectBtn')

var url          = 'http://demo20.cassia.pro/api/gap/nodes/?mac=' + MAC
                   + '&access_token=' + tokenFromCookie
                   + '&event=1&interval=5&filter_duplicates=1'
var es           = new EventSource(url)
var isOpenStream = false
var scannerList  = []

function prepConnect(){
  mac.value = this.id
  connectBtn.disabled = false;

}

es.onerror = (error) => {
  document.getElementById("status").innerHTML += "An error occured." + "<br>"
  console.log(error)
}

es.onopen = () => {
  isOpenStream = true
  document.getElementById("status").innerHTML += "Event stream opened.  Scanning BLE devices." + "<br>"
}

es.onmessage = event => {
  var device = JSON.parse(event.data)
  var kdcDevice = /^KDC/.test(device.name)
  var results = document.getElementById('results')
  if(kdcDevice){
    var arr = device.name.split('[')
    device.model = arr[0]
    device.sn    = 'sn: ' + arr[1].replace(']', '')
    var kdc = {
      model:   device.model,
      sn:      device.sn,
      mac:     device.bdaddrs[0].bdaddr,
      profile: device.bdaddrs[0].bdaddrType
    }

    var el = document.createElement('div')

    el.className = 'scanner'
    el.id = kdc.mac
    el.innerHTML = "<span class=info>" + kdc.model + "<br>" + kdc.sn + "</span>"
    results.append(el)

    el.addEventListener('click', prepConnect)
  }
}

closeBtn.addEventListener('click', () => {
  if(isOpenStream){
    es.close()
    document.getElementById("status").innerHTML += "Event stream closed." + "<br>"
    isOpenStream = false
  }
})
