function initMap() {
    new google.maps.Map(document.getElementById('myMap'), {
        zoom: 16,
        center: {lat: 40.6116702, lng: -8.7530191}
    });
}

$(function() {

var waypts = [];
var origin = "";
var destination = "";



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// random playlist
setInterval(function () {
    // set some random directions and waypoints
    //start = ["Halifax, NS","Boston, MA","New York, NY","Miami, FL"];
    //waypoints = ["montreal, quebec","toronto, ont","chicago, il","winnipeg, mb","fargo, nd","calgary, ab","spokane, wa"]
    //end = ["Vancouver, BC","Seattle, WA","San Francisco, CA","Los Angeles, CA"]

    waypoints = [new google.maps.LatLng(40.6333806,-8.7492999),
        new google.maps.LatLng(40.6410565,-8.7478676),
        new google.maps.LatLng(40.6270952,-8.7250694),
        new google.maps.LatLng(40.6176485,-8.712887),
        new google.maps.LatLng(40.6104224,-8.7216838),
        new google.maps.LatLng(40.6375942,-8.6744183),
        new google.maps.LatLng(40.6435403,-8.6646604)]
    end = [new google.maps.LatLng(40.6385917,-8.6544511),
        new google.maps.LatLng(40.642402,-8.6567013),
        new google.maps.LatLng(40.6439987,-8.6465128),
        new google.maps.LatLng(40.6371687,-8.6517008)]

    origin = new google.maps.LatLng(40.6116702, -8.7530191); //start[getRandomInt(0,3)]
    waypts = [];
    waypts.push({location: waypoints[getRandomInt(0,6)], stopover: true});
    destination = end[getRandomInt(0,3)]

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('myMap'), {});
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}, 10000);

});