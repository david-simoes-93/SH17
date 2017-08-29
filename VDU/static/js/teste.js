

$(document).ready(function() {

    $('#component_btn').on('click', function () {
        /********* MQTT **************/
        var msg = $('#component_msg').val();
        var topic = $('#component').find('option:selected').val();
        var result = "TÓPICO: " + topic +" | MSG: " + msg;
        if (msg && topic) {
            client.publish(topic, msg);
        }
        console.log(result);
        $('#component_result').html(result);
    });

});