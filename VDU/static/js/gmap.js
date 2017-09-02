var myMap;
var myPano;
var sv;

var waypts = [];
var origin = "";
var destination = "";
var driving = false;

var path_points = [];
var waypoint_indexes = [];
var path_index = 0;
var marker;

var caisCriativo = {lat: 40.6122447, lng: -8.7519046};
var waypoints = [new google.maps.LatLng(40.6333806, -8.7492999),
    new google.maps.LatLng(40.6410565, -8.7478676),
    new google.maps.LatLng(40.6270952, -8.7250694),
    new google.maps.LatLng(40.6176485, -8.712887),
    new google.maps.LatLng(40.6104224, -8.7216838),
    new google.maps.LatLng(40.6375942, -8.6744183)]
var endLocations = [new google.maps.LatLng(40.6385917, -8.6544511),
    new google.maps.LatLng(40.642402, -8.6567013),
    new google.maps.LatLng(40.6439987, -8.6465128),
    new google.maps.LatLng(40.6371687, -8.6517008),
    new google.maps.LatLng(40.6435403, -8.6646604)]

function initMap() {
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

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            path_points = response.routes[0].overview_path;
            waypoint_indexes = [];
            var close_waypoints = [];
            for (var i = 0; i < waypts.length; i++) {
                close_waypoints=[];
                for (var index = 0; index < path_points.length; index++) {
                    var latDiff = path_points[index].lat() - waypts[i].location.lat();
                    var lngDiff = path_points[index].lng() - waypts[i].location.lng();
                    var realDist = Math.sqrt(latDiff*latDiff+lngDiff*lngDiff);
                    if (realDist < 0.001) {
                        close_waypoints.push({"index":index,"dist":realDist});
                    }
                }
                if(close_waypoints.length>0){
                    var minDist = close_waypoints[0].dist;
                    var minIndex = close_waypoints[0].index;
                    for (var index = 1; index < close_waypoints.length; index++) {
                        if(close_waypoints[index].dist<minDist){
                            minDist = close_waypoints[index].dist;
                            minIndex = close_waypoints[index].index;
                        }
                    }
                    waypoint_indexes.push(minIndex);
                }
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function vdu_setRoute(ids) {
    if (ids.length > 0) {
        path_index = 0;

        origin = caisCriativo;
        waypts = [];
        for (var i = 1; i < ids.length; i++) {
            if (ids[i] >= 0 && ids[i] < waypoints.length)
                waypts.push({location: waypoints[i], stopover: true});
        }
        if (ids[0] >= 0 && ids[0] < endLocations.length)
            destination = endLocations[ids[0]]
        else
            destination = endLocations[getRandomInt(0, endLocations.length - 1)]

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        myMap = new google.maps.Map(document.getElementById('myMap'), {mapTypeId: 'roadmap'});
        directionsDisplay.setMap(myMap);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    }
}

function vdu_startRoute() {
    driving = true;
}

function vdu_nextWaypointRoute() {
    for (var i = 0; i < waypoint_indexes.length; i++) {
        if (waypoint_indexes[i] >= path_index) {
            path_index = waypoint_indexes[i]; //index of next waypoint
            break;
        }
    }
    driving = false;
}

// skip to 90% of path
function vdu_fastForwardRoute() {
    path_index = path_points.length - 10;
}

function vdu_endRoute() {
    driving = false;
    waypts = [];
    path_index = 0;

    initMap();
}

/*
// random gps route
setInterval(function () {
    if(path_index < path_points.length)
        return;
    path_index=0;

    origin = new google.maps.LatLng(40.6122447, -8.7519046); //start[getRandomInt(0,3)]
    waypts = [];
    waypts.push({location: waypoints[getRandomInt(0,6)], stopover: true});
    destination = endLocations[getRandomInt(0,3)]

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    myMap = new google.maps.Map(document.getElementById('myMap'), {mapTypeId: 'roadmap'});
    directionsDisplay.setMap(myMap);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}, 10000);
*/

setInterval(function () {
    if (driving && path_index < path_points.length) {
        if (marker != null)
            marker.setMap(null);
        marker = new google.maps.Marker({
            position: path_points[path_index],
            map: myMap
        });
        myMap.setCenter(path_points[path_index]);
        myMap.setZoom(16);
        myMap.setMapTypeId('satellite');

        sv.getPanorama({location: path_points[path_index], radius: 50}, processSVData);

        if (path_index + 1 < path_points.length) {
            var p1 = {
                x: path_points[path_index].lng(),
                y: path_points[path_index].lat()
            };
            var p2 = {
                x: path_points[path_index + 1].lng(),
                y: path_points[path_index + 1].lat()
            };


            var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI; // in geometric circle
            angleDeg = 90 - angleDeg; // in google coords
            myPano.setPov({
                heading: angleDeg,
                pitch: 0
            });
        }

        path_index++;
    }
}, 2000);

initMap();
