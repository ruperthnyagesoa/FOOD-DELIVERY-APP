// import { firebase } from './firebase.js';



function writeOrder() {
	var info = JSON.parse(document.getElementById('info').textContent);
	var rests = JSON.parse(document.getElementById('rests').textContent);
	console.log(info);
	console.log(rests);
	const csrftoken1 = document.querySelector('[name=csrfmiddlewaretoken]').value;
	console.log(JSON.stringify(csrftoken1));
	// Initialize Firebase
	console.log(info["cust_name"]);
	var i = 0;
	console.log(Object.keys(rests).length);
	var jsonx={};
	for (k in rests) {
		console.log(rests[k]['rest_name']);
		var key = firebase.database().ref('Orders/').push().key;
		jsonx[key]={
			'rest_id': parseInt(k),
			'cust_id': parseInt(info["cust_id"]),
			'items': rests[k]['items']
		};
		firebase.database().ref('Orders/' + key).set({
			rest_id: parseInt(k),
			rest_name: rests[k]['rest_name'],
			pickuplat: parseFloat(rests[k]['pickuplat']),
			pickuplong: parseFloat(rests[k]["pickuplong"]),
			item_list: rests[k]["items"],
			cust_id: info["cust_id"],
			cust_name: info["cust_name"],
			del_lat: parseFloat(document.getElementById('lat').value),
			del_long: parseFloat(document.getElementById('long').value),
			del_id: -1,
			curr_status: 0
		}).then(() => {
			i++;
			if (i == Object.keys(rests).length) {
				console.log(JSON.stringify(jsonx));
				successfulorder(jsonx);
			}

		});
	}
}
function geoFindMe() {

	function success(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		document.getElementById('lat').value = lat;
		document.getElementById('long').value = long;
		const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + long + "," + lat + ".json?access_token=pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew";
		$.getJSON(url, function (ans) {
			console.log(ans.features[0].place_name);
			document.getElementById('add').value = ans.features[0].place_name;
		});
		document.getElementById("order").disabled = false;
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