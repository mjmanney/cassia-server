const MAC  = 'CC:1B:E0:E0:5F:E0'

function cookieParser(cookie) {
  if(cookie.search(';') != -1){
    console.log('There are multiple cookies in the tray')
  } else {
    var crumb = cookie.split('=')
    return crumb[1]
  }
}

var tokenFromCookie = cookieParser(document.cookie)

var mac        = document.getElementById('mac')
var ul         = document.getElementById('log')
var closeBtn   = document.getElementById('closeBtn')

var url          = 'http://demo20.cassia.pro/api/gap/nodes/?mac=' + MAC
                   + '&access_token=' + tokenFromCookie
                   + '&event=1&interval=5&filter_duplicates=1'
var es           = new EventSource(url)
var isOpenStream = false

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
  if(kdcDevice){
    var li = document.createElement("li")
    ul.appendChild(li)
    li.addEventListener('click', () => {
      let addr = device.bdaddrs[0].bdaddr
	    let type = device.bdaddrs[0].bdaddrType
      mac.value = addr
    })
    li.innerHTML = device.name
  }
}

closeBtn.addEventListener('click', () => {
  if(isOpenStream){
    es.close()
    document.getElementById("status").innerHTML += "Event stream closed." + "<br>"
    isOpenStream = false
  }
})
