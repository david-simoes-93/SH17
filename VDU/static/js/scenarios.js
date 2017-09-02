
function activate_scenario(scenario) {
    console.log("cenas1: " + scenario);

}

function reset_scenarios_btns() {
    $('#scenario1_btn').removeClass('active');
    $('#scenario2_btn').removeClass('active');
    $('#scenario3_btn').removeClass('active');
}


$(document).ready(function () {
    client.on('message', function (topic, message) {

        message = JSON.parse(message);

        console.log(message.toString(), topic);

        switch (topic) {
            case 'vdu/scenario/activate/in':
                switch(message.value){
                    case "family week day":
                        activate_scenario('family');
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
                reset_scenarios_btns();
                switch(message.value){
                    case "family week day":
                        $('#scenario1_btn').addClass('active');
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Week Day\" selected";
                        break;
                    case "family non week day":
                        $('#scenario2_btn').addClass('active');
                        document.getElementById("event").innerHTML = "Scenario \"Family @ Weekend\" selected";
                        break;
                    case "free style":
                        $('#scenario3_btn').addClass('active');
                        document.getElementById("event").innerHTML = "Scenario \"Free Style\" selected";
                        break;
                    default:
                        console.log("Ignored scenario: "+message.value)
                        break;
                }
                break;
            default:
                console.log("Unknown topic: " + message.toString(), topic);
                break;
        }

    });
});

