var SW;

function getIdFromName(name){
    var names = ['rui', 'hugo', 'herlander', 'roger', 'david'];

    return names.indexOf(name);
}

function getIdFromUID(uid){
    switch(uid){
        case "7a0dc528-bccc-47e3-b654-2f8382013708": // ROGER
            return 3;
        case "c9584522-1f3b-4600-bddc-e6bbb8f7abcc": // DAVID
            return 4;
        case "bdf14fa2-2dbe-43be-8141-0aec192c5693": // HERLANDER
            return 2;
        case "32499704-f81a-4290-a82c-70bcf398277a": // HUGO
            return 1;
        case "f50f40e9-da68-4359-a8c5-a758b65f26db": // RUI
            return 0;
        default:
            return -1;
    }
}

function stop_siri(){
    SW.cache.interpolation = {
        speed: 0,
        amplitude: 0
    };
}

function vdu_displayAlert(msg){
    document.getElementById("event").innerHTML = msg;

    SW.cache.interpolation = {
        speed: 0.12,
        amplitude: 1
    };

    setTimeout(stop_siri, 100*msg.length);
}

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
                if (message.value) {
                    vdu_setRoute(message.value.map(Number));
                }
                if (message.state) {
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
            case 'lcu/seatposition/out':
                //if(message.result.profileId!="" && message.result.profileName!="") {
                var id = getIdFromUID(message.result.profileId);
                vdu_setPersonInSeat(message.result.lastSeatPosition, id);
               // }
                break;
            case 'scu/pimp/in':
                if(message.action=='open')
                    vdu_playPimpSong();
                break;
            case 'scu/charger/out':
                if(message.status=='plugged')
                    vdu_switchCharging();
                break;
            case 'vdu/kms_display/in':
                vdu_kmh(parseInt(message.value));
                break;
            case 'vdu/radio/in':
                vdu_spotify(getIdFromUID(message.value));
                vdu_nextSong();
                break;
            case 'vdu/temperature/in':
                vdu_tempMod(parseInt(message.value));
                break;
            case 'vdu/power/in':
                vdu_power(parseInt(message.value));
                break;
            case 'vdu/alerts/in':
                vdu_displayAlert(message.value);
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
    });


    SW = new SiriWave({
            width: 190,
            height: 80,
            speed: 0.12,
            amplitude: 0,
            container: document.getElementById('siri-container'),
            autostart: true
    });
});


