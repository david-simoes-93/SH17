

/**************** *********************/
$(document).ready(function() {
    var eventOutputContainer = document.getElementById("event");
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
    var gauge = new RadialGauge({
        renderTo: 'canvas-id',
        width: 300,
        height: 300,
        units: "Km/h",
        minValue: 0,
        maxValue: 220,
        majorTicks: [
            "0",
            "20",
            "40",
            "60",
            "80",
            "100",
            "120",
            "140",
            "160",
            "180",
            "200",
            "220"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 160,
                "to": 220,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
    }).draw();

    var timers = [];

    function animateGauges() {
        document.gauges.forEach(function(gauge) {
            timers.push(setInterval(function() {
                var min = gauge.options.minValue - 20;
                var max = gauge.options.maxValue + 20;

                gauge.value = min + Math.random() * (max - min);
            }, gauge.animation.duration + 50));
        });
    }

    function stopGaugesAnimation() {
        timers.forEach(function(timer) {
            clearInterval(timer);
        });
    }
    animateGauges();

});
