var db = firebase.database();
var events = db.ref('Orders');
console.log(events);
var user_id = JSON.parse(document.getElementById('user_id').textContent);
var query = events.orderByChild('cust_id').equalTo(parseInt(user_id));

query.once('value', function (snapshot) {
	if (snapshot.exists()) {
		var content = '';

		snapshot.forEach(function (data) {
			var Rname = data.val().rest_name;
			var orderid = data.key;
			content += '<tr>';
			content += '<td>' + Rname + '</td>';
			k = Object.keys(data.val().item_list);
			var i = 0;
			content += '<td>'
			for (i = 0; i < k.length; i++) {
				content += ' |' + k[i] + '| ';
			}
			content += '</td>';

			var str = "Track Order";
			var url1 = "/orderstatus/" + orderid;
			var result = str.link(url1);
			content += '<td>' + result + '</td>';

			content += '</tr>';

		});

		$('#ex-table').html(content);
	}
});