var myMap;
var myPano;
var sv;

function initMap() {
    var caisCriativo = {lat: 40.6122447, lng: -8.7519046};

    sv = new google.maps.StreetViewService();

    myPano = new google.maps.StreetViewPanorama(document.getElementById('myStreetView'), {
        disableDefaultUI: true
    });

    myMap = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 16,
        center: caisCriativo,
        disableDefaultUI: true,
        streetViewControl: false
    });

    panoCaisC = sv.getPanorama({location: caisCriativo, radius: 50}, processSVData);
    myPano.setPov({
        heading: 200,
        pitch: 0
    });

}

function processSVData(data, status) {
    if (status === 'OK') {
        myPano.setPano(data.location.pano);
        myPano.setVisible(true);
    } else {
        console.error('Street View data not found for this location.');
    }
}

$(function() {

var waypts = [];
var origin = "";
var destination = "";

var path_points = [];
var path_index = 0;
var marker;



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
            path_points = response.routes[0].overview_path
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
    if(path_index < path_points.length)
        return;
    path_index=0;

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

    origin = new google.maps.LatLng(40.6122447, -8.7519046); //start[getRandomInt(0,3)]
    waypts = [];
    waypts.push({location: waypoints[getRandomInt(0,6)], stopover: true});
    destination = end[getRandomInt(0,3)]

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    myMap = new google.maps.Map(document.getElementById('myMap'), {mapTypeId: 'roadmap'});
    directionsDisplay.setMap(myMap);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}, 10000);


    setInterval(function () {
        if(path_index < path_points.length){
            if(marker!=null)
                marker.setMap(null);
            marker = new google.maps.Marker({
                position: path_points[path_index],
                map: myMap
            });
            myMap.setCenter(path_points[path_index]);
            myMap.setZoom(16);
            myMap.setMapTypeId('satellite');

            sv.getPanorama({location: path_points[path_index], radius: 50}, processSVData);

            if(path_index+1 < path_points.length) {
                var p1 = {
                    x: path_points[path_index].lng(),
                    y: path_points[path_index].lat()
                };
                var p2 = {
                    x: path_points[path_index+1].lng(),
                    y: path_points[path_index+1].lat()
                };


                var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI; // in geometric circle
                angleDeg = 90-angleDeg; // in google coords
                myPano.setPov({
                    heading: angleDeg,
                    pitch: 0
                });
            }

            path_index++;
        }
    }, 2000);

});