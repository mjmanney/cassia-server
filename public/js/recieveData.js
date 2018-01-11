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

var url          = 'http://demo20.cassia.pro/api/gatt/nodes/?mac=' + MAC
                   + '&event=1'
                   + '&access_token=' + tokenFromCookie
var es           = new EventSource(url)
var isOpenStream = false

es.onerror = (error) => {
  document.getElementById("status").innerHTML += "An error occured." + "<br>"
  console.log(error)
}

es.onopen = () => {
  isOpenStream = true
  document.getElementById("status").innerHTML += "Event stream opened.  Waiting for messages..." + "<br>"
}

es.onmessage = event => {
  var data = JSON.parse(event.data)
  console.log(data)
}

closeBtn.addEventListener('click', () => {
  if(isOpenStream){
    es.close()
    document.getElementById("status").innerHTML += "Connection closed." + "<br>"
    isOpenStream = false
  }
})
