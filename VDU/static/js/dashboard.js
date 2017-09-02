/**************** *********************/
$(document).ready(function () {
    var eventOutputContainer = document.getElementById("event");

    client.on('message', function (topic, message) {
        // message is Buffer

        //eventOutputContainer.innerHTML = message.toString();
        console.log(message.toString(), topic);

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
                    vdu_tempScu(message.value);
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
                        vdu_prevSong();
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


    var SW = new SiriWave({
        width: 400,
        height: 100,
        speed: 0.12,
        amplitude: 1,
        container: document.getElementById('siri-container'),
        autostart: true
    });
});


