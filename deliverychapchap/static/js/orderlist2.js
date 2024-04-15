var db = firebase.database();
var events = db.ref('Orders');
console.log(events);
var user_id = JSON.parse(document.getElementById('user_id').textContent);
var query = events.orderByChild('rest_id').equalTo(parseInt(user_id));

query.on('value', function (snapshot) {
	if (snapshot.exists());
	$('#ex-table').find('tbody').empty();
	snapshot.forEach(function (data) {
		var orderid = data.key;
		var Customername = data.val().cust_name;
		var lat = data.val().del_lat;
		var long = data.val().del_long;
		const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + long + "," + lat + ".json?access_token=pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew";
		$.getJSON(url, function (ans) {
			var content = '';
			content += '<tr>';
			content += '<th scope="row">#</th>';
			var str = orderid.toString();
			var url1 = "/restordercheck/" + orderid;
			var result = str.link(url1);
			content += '<td>' + result + '</td>';
			content += '<td>' + Customername + '</td>';
			console.log(ans.features[0].place_name);
			content += '<td>' + ans.features[0].place_name + '</td></tr>';
			$('#ex-table').find('tbody').append(content);

		});
	});
});
function getaddress() {
	return document.getElementById('xyz').value;
}