/************************ Gauge Kms ************/
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

var gaugeRPM = new RadialGauge({
    renderTo: 'canvas-id-rpm',
    width: 300,
    height: 300,
    units: "RPM",
    minValue: 0,
    maxValue: 6000,
    majorTicks: [
        "0",
        "1000",
        "2000",
        "3000",
        "4000",
        "5000",
        "6000"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 5000,
            "to": 6000,
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

function vdu_kmh(spd){
    if(spd>=gauge.minValue && spd<=gauge.maxValue)
        gauge.value = spd;
    else
        gauge.value = getRandomInt(50, 120);
}

function vdu_rpm(spd){
    if(spd>=gaugeRPM.minValue && spd<=gaugeRPM.maxValue)
        gaugeRPM.value = spd;
    else
        gaugeRPM.value = getRandomInt(2000, 4000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
// Bring life to the dials
setInterval(function () {
    // Speed
    newVal = getRandomInt(50, 120);
    gauge.value = newVal;

    newVal2 = getRandomInt(2000, 4000);
    gaugeRPM.value = newVal2;
}, 2000);
*/