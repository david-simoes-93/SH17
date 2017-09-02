/**************** *********************/
$(document).ready(function () {
    var eventOutputContainer = document.getElementById("event");

    client.on('message', function (topic, message) {
        // message is Buffer

        //eventOutputContainer.innerHTML = message.toString();
        console.log(message.toString(), topic)

        message = JSON.parse(message);
        switch (topic) {
            case 'vdu/gps_maps/in':
                console.log(message);
                if (message.value) {
                    console.log("set" + message.value);
                    vdu_setRoute(message.value.map(Number));
                }
                if (message.state) {
                    console.log("get" + message.value);
                    switch (message.state) {
                        case 'start':
                            vdu_startRoute();
                            break;
                        case 'fast':
                            vdu_fastForwardRoute();
                            break;
                        case 'end':
                            vdu_endRoute();
                            break;
                        default:
                            console.log("Unknown GPS message" + message);
                            break;
                    }
                }
                break;
            case 'vdu/car_top/in':
                break;
            case 'vdu/car_seats/in':
                break;
            case 'vdu/kms_display/in':
                vdu_kmh(parseInt(message.value));
                break;
            case 'vdu/radio/in':
                vdu_spotify(parseInt(message.value));
                vdu_nextSong();
                break;
            case 'vdu/temperature/in':
                vdu_tempMod(parseInt(message.value));
                break;
            case 'vdu/power/in':
                vdu_power(parseInt(message.value));
                break;
            case 'vdu/alerts/in':
                document.getElementById("event").innerHTML = message.value;
                break;
            case 'vdu/rpm_display/in':
                vdu_rpm(parseInt(message.value));
                break;
            case 'vdu/volume/in':
                vdu_volume(parseInt(message.value));
                break;
            case 'scu/temperature/out':
                if(message.success=="true")
                    vdu_tempScu(message.value)
                break;
            case 'vdu/scenario/activate/in':
                switch(message.value){
                    case "family week day":
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Week Day\" activated";
                        break;
                    case "family non week day":
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Weekend\" activated";
                        break;
                    case "free style":
                        document.getElementById("event").innerHTML = "Scenario \"Free Style\" activated";
                        break;
                    default:
                        console.log("Ignored scenario: "+message.value)
                        break;
                }
                break;
            case 'vdu/scenario/selection/in':
                switch(message.value){
                    case "family week day":
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Week Day\" selected";
                        break;
                    case "family non week day":
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Weekend\" selected";
                        break;
                    case "free style":
                        document.getElementById("event").innerHTML = "Scenario \"Free Style\" selected";
                        break;
                    default:
                        console.log("Ignored scenario: "+message.value)
                        break;
                }
                break;
            case 'gcu/gesture/out':
                switch(message.action){
                    case "AirspinRight":
                        vdu_volume(10);
                        break;
                    case "AirspinLeft":
                        vdu_volume(-10);
                        break;
                    case "SwipeRight":
                        vdu_nextSong();
                        break;
                    case "SwipeLeft":
                        // special interaction for demo
                        vdu_nextWaypointRoute();
                        //vdu_prevSong();
                        break;
                    default:
                        console.log("Ignored HOVER: "+message.action)
                        break;
                }
                break;
            default:
                console.log("Unknown topic: " + message.toString(), topic);
                break;
        }

        //client.end()
    });

    /********* EventSource **************/
    /*
    var source = new EventSource("{{ url_for('sse.stream') }}");
    source.addEventListener('greeting', function(event) {
            var data = JSON.parse(event.data);
            //alert("The server says " + data.message);
            eventOutputContainer.innerHTML = data.message;
        }, false);
        source.addEventListener('error', function(event) {
            var msg = "Failed to connect to event stream. Is Redis running?";
            console.log(msg);
            eventOutputContainer.innerHTML = msg;
    }, false);
    */


});
