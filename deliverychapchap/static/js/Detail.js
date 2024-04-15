var counter = 1;

function increment() {
	if (counter >= 0) {
		var object=JSON.parse(document.getElementById('object').textContent);
		counter++;
		document.getElementById("xyz").href = "/addcart/"+object +'/'+ counter;
		document.getElementById("max").value = counter;
	}
}
function decrement() {
	if (counter >= 1) {
		counter--;
		var object=JSON.parse(document.getElementById('object').textContent)
		document.getElementById("xyz").href = "/addcart/"+object +'/'+ counter;
		document.getElementById("max").value = counter;
	}
}