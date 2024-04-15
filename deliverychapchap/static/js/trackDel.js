function geoFindMe() {
	function success(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var user_id = JSON.parse(document.getElementById('user_id').textContent);
		firebase.database().ref('DeliveryExec/' + parseInt(user_id)).set({
			currlat: latitude,
			currlong: longitude,
			is_busy: false
		}).then((error) => {
			if (error) {
				console.log("Error");
			}
			else {
				window.location.href = "/delhome";
			}

		});
		var showCurrentData = firebase.database().ref('DeliveryExec');
		showCurrentData.on('value', (snapshot) => {
			const data = snapshot.val();
			console.log(data);
		});

	}

	function error() {
		status.textContent = 'Unable to retrieve your location';
	}

	if (!navigator.geolocation) {
		status.textContent = 'Geolocation is not supported by your browser';
	} else {
		status.textContent = 'Locating…';
		navigator.geolocation.getCurrentPosition(success, error);
	}

}
document.querySelector('#locate').addEventListener('click', geoFindMe);