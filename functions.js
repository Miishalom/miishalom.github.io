function checkInputs() {
	const dateInput = document.querySelector('#dateInput')
	const timeInput = document.querySelector('#timeInput')
	const now = new Date()

	if (!dateInput.value) {
		alert('Введите дату')
		return
	}

	if (!timeInput.value) {
		alert('Введите время')
		return
	}

	const inputValue = dateInput.value
	const [year, month, day] = inputValue.split('-')
	const inputDate = new Date()
	inputDate.setDate(day)
	inputDate.setMonth(month)
	inputDate.setFullYear(year)

	const timeValue = timeInput.value
	const [hours, minutes] = timeValue.split(':')
	const inputTime = new Date()
	inputTime.setHours(hours)
	inputTime.setMinutes(minutes)

	if (inputDate.getDate() < now.getDate()) {
		console.log('inputDate < now)')
		alert('Нельзя указывать даты из прошлого')
		return
	}

	if (inputDate.getDate() == now.getDate()) {
		if (inputTime.getTime() < now.getTime()) {
			alert('Нельзя указывать время из прошлого')
			return
		}
	}

	sendData({
		day: inputDate.getDate(),
		month: inputDate.getMonth(),
		year: inputDate.getFullYear(),
		hours:  parseInt(hours),
		minutes:  parseInt(minutes),
	})
}

// create now date on InputDate and now time + 10min on InputTime
function NowDateTime() {
	const plusMinutes = 10
	const now = new Date()

	now.setMinutes(now.getMinutes() + plusMinutes)
	const hours = now.getHours().toString().padStart(2, '0')
	const minutes = now.getMinutes().toString().padStart(2, '0')
	const currentTime = `${hours}:${minutes}`

	const year = now.getFullYear().toString()
	const month = (now.getMonth() + 1).toString().padStart(2, '0')
	const day = now.getDate().toString().padStart(2, '0')
	const currentDate = `${year}-${month}-${day}`

	document.getElementById('dateInput').value = currentDate
	document.getElementById('timeInput').value = currentTime

    var userAgent = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isMobile) {
        var inputs = document.getElementById('inputsDiv')
        inputs.classList.remove('inputsPC')
        inputs.classList.add('inputsMobile')
    }
}

// save data and close WebApp
function sendData(dataToSend) {
	window.Telegram.WebApp.close()
	fetch('http://127.0.0.1:5000/save-datetime', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataToSend),
	})
		.then(response => response.json())
		.then(data => {
			console.log('Response from server:', data)
		})
		.catch(error => {
			console.error('Error:', error)
		})
}