

/**************** *********************/
$(document).ready(function() {
    var eventOutputContainer = document.getElementById("event");

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString(), topic);
      eventOutputContainer.innerHTML = message.toString();
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
