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
var closeBtn   = document.getElementById('closeBtn')

var url          = 'http://demo20.cassia.pro/api/gatt/nodes/?mac=' + MAC
                   + '&event=1'
                   + '&access_token=' + tokenFromCookie
var es           = new EventSource(url)
var isOpenStream = false

var ul         = document.getElementById('log')

function addItem(data) {
	var li = document.createElement("li")
	li.className = 'data'
	li.innerHTML = data
	ul.appendChild(li)
}

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
  var p_data = data.value
  init(p_data)
}

closeBtn.addEventListener('click', () => {
  if(isOpenStream){
    es.close()
    document.getElementById("status").innerHTML += "Connection closed." + "<br>"
    isOpenStream = false
  }
})
