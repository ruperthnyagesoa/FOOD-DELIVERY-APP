var db = firebase.database();
var events = db.ref('Orders/');
var orderid = JSON.parse(document.getElementById('orderid').textContent);
query = events.orderByKey();
query.on('value', function (snapshot) {
	if (snapshot.exists()) {
		var content = '';
		snapshot.forEach(function (data) {
			if (data.key == orderid) {
				showmap(data.val().del_lat, data.val().del_long, data.val().del_id);
				var os = data.val().curr_status;
				console.log(os);
				if (os == 0) {
					content += "<h3>Order Placed Successfully</h3>";
				}
				else if (os == 1) {
					content += "Confirmed";
				}
				else if (os == 2) {
					content += "Preparing";
				}
				else if (os == 3) {
					content += "Waiting for Delivery";
				}
				else if (os == 4) {
					content += "Out for Delivery";
				}
				else if (os == 5) {
					content += "Delivered";
					ordercompleted();
				}
			}

		});
		$('#brrr').html(content);
	}
});
function showmap(custlat, custlong, did) {
	var db = firebase.database();
	var events = db.ref('DeliveryExec/');
	console.log(events);
	var query = events.orderByKey();
	mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [custlong, custlat],
		zoom: 10
	});

	// Create a default Marker and add it to the map.
	var marker1 = new mapboxgl.Marker()
		.setLngLat([custlong, custlat])
		.addTo(map);
	var dellat = 0.00;
	var dellong = 0.00;
	query.on('value', function (snapshot) {
		if (snapshot.exists()) {
			snapshot.forEach(function (data) {
				if (parseInt(data.key) == did) {
					dellat = data.val().currlat;
					dellong = data.val().currlong;
					console.log(dellong, dellat);
					var marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
						.setLngLat([dellong, dellat])
						.addTo(map);
				}
			});
		}

	});


	// Create a default Marker, colored black, rotated 45 degrees.
}