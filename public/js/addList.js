var ul         = document.getElementById('log')

function addItem(data) {
	var li = document.createElement("li")
	li.className = 'data'
	li.innerHTML = data
	ul.appendChild(li)
}