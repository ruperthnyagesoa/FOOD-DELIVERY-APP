function getdistance(lat1, lng1, lat2, lng2) {
	mapboxgl.accessToken = 'pk.eyJ1IjoibWpkYW5pZWxzb24iLCJhIjoiY2tkNm4wMTdoMml2bDJzbXlvZGp4YW0xcyJ9.gVoNxvWvLwK2Ev6ukzArsQ';
	var to = [lng1, lat1] //lng, lat
	var from = [lng2, lat2] //lng, lat
	var options1 = {
		units: 'kilometers'
	}; // units can be degrees, radians, miles, or kilometers, just be sure to change the units in the text box to match.

	var distance = turf.distance(to, from, options1);

	return distance;
}
function success(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	console.log(latitude + " " + longitude);
	var db = firebase.database();
	var events = db.ref('Orders');
	// query=events.orderByChild('rest_id');
	var user_id = JSON.parse(document.getElementById('user_id').textContent);
	var del = db.ref('DeliveryExec');
	del.child(user_id).once('value', (snapshot)=>{
		if(snapshot.exists()){
			if(snapshot.val().is_busy==true){
				var qry=events.orderByChild('del_id').equalTo(parseInt(user_id))
				qry.once('value', (snapshot)=>{
					if(snapshot.exits()){
						snapshot.forEach((data)=>{
							var orderid=data.key;
							var str = "Ongoing Delivery";
							var url1 = "/takeorder/" + orderid.toString();
							var result = str.link(url1);
							content += '<tr><td>' + result + '</td></tr>';
							$('#ex-table').html(content);

						})
					}
				})
			}
			else{
				events.on('value', function (snapshot) {
					if (snapshot.exists()) {
						$('#ex-table').find('tbody').empty();
						snapshot.forEach(function (data) {
							var restaurantname = data.val().rest_name;
							var Customername = data.val().cust_name;
							var orderid = data.key;
							var pickuplat = data.val().pickuplat;
							var pickuplong = data.val().pickuplong;
							var status = data.val().curr_status;
							var dist = getdistance(latitude, longitude, pickuplat, pickuplong);
							if ((dist<=5 && status==3)) {
								const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + pickuplong + "," + pickuplat + ".json?access_token=pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew";
								$.getJSON(url, function (ans) {
									var content = '';
									content += '<tr>';
									content += '<td>' + orderid + '</td>';
									content += '<td>' + restaurantname + '</td>';
									content += '<td>' + Customername + '</td>';
									content += '<td>' + ans.features[0].place_name + '</td>';
									content += '<td>' + dist.toFixed([2]) + 'km</td>';
									var str = "Go to Order";
									var url1 = "/takeorder/" + orderid.toString();
									var result = str.link(url1);
									content += '<td>' + result + '</td>';
									content += '</tr>';
									$('#ex-table').append(content);
								});
							}
						});
					}
				});
			}

		}
	})
}

function error() {
	alert('Sorry, no position available.');
}

const options = {
	enableHighAccuracy: true,
	maximumAge: 300000,
	timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);
