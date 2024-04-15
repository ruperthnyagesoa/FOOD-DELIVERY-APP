var user_id = JSON.parse(document.getElementById('user_id').textContent);
var orderid = JSON.parse(document.getElementById('orderid').textContent);
var url = "/takeorder/" + orderid;
var url1="/finishorder/" +orderid;
console.log(orderid+" "+ user_id)
var ref = firebase.database().ref('Orders/' + orderid);
var ref1 = firebase.database().ref('DeliveryExec/' + user_id);
ref.update({
    del_id: parseInt(user_id)
});
var showCurrentData = firebase.database().ref('Orders');
showCurrentData.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
});
var query = firebase.database().ref('Orders/');
query.child(orderid).get().then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        document.getElementById('cust_name').innerHTML = snapshot.val().rest_name;
        var lat = snapshot.val().pickuplat;
        var long = snapshot.val().pickuplong;
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + long + "," + lat + ".json?access_token=pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew";
        $.getJSON(url, function (ans) {
            $('#address').html(ans.features[0].place_name);
        });
        var arr = [];
        arr[0] = 'Waiting'; arr[1] = 'Confirmed'; arr[2] = 'Preparing'; arr[3] = 'Waiting for Delivery'; arr[4] = 'Picked Up, On the way'; arr[5] = 'Delivered';
        document.getElementById('curr_status').innerHTML = arr[snapshot.val().curr_status];
    }
});
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude + " " + longitude);
    console.log(user_id)
    ref1.update({
        currlat: latitude
    });
    ref1.update({
        currlong: longitude
    });
    ref1.update({
        is_busy: true
    });
    mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaDQ1NTYiLCJhIjoiY2tvaG9hbXdnMTFpYzJub2MxOXJ5emxyNyJ9.EWWBTTl5gYAZ_HRXhoSEew';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 10
    });

    // Create a default Marker and add it to the map.
    var marker1 = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    query.child(orderid).get().then((snapshot) => {
        if (snapshot.exists()) {
            var plat = snapshot.val().pickuplat;
            var plong = snapshot.val().pickuplong;
            var dellat = snapshot.val().del_lat;
            var dellong = snapshot.val().del_long;
            var marker2 = new mapboxgl.Marker({ color: 'green'})
                .setLngLat([dellong, dellat])
                .addTo(map);
            var marker3 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
                .setLngLat([plong, plat])
                .addTo(map);
        }
  });
}

function error() {
    alert('Sorry, no position available.');
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);
function PickupOrder() {
        ref.update({
        curr_status: 4
    });
    window.location.href = url;
}
function Delivered(){
    ref.update({
        curr_status: 5
    });
    ref.remove();
    ref1.update({
        is_busy: false
    });
    window.location.href = url1;
}
