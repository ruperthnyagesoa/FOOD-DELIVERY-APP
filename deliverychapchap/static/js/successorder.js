function successfulorder(data){
	const csrftoken = Cookies.get('csrftoken');
	console.log(csrftoken);
	fetch('/successorder',{
		method:"POST",
		headers: {
			'Content-type': 'Application/json',
			'X-CSRFToken': csrftoken
		},
		mode: 'same-origin',
		body: JSON.stringify(data)
	}).then(response=>response.json().then(res=>
			{
			var a = document.createElement('a');
			var text=document.createTextNode("Track Your Orders!");
			a.href = "/trackorders";
			a.appendChild(text);
			$('#msg').html(res['message']);
			document.getElementById('msg').appendChild(a);

			})
	)
}