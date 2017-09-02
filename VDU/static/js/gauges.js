var speedMinValue = 0;
var speedMaxValue = 220;
var rpmMinValue = 0;
var rpmMaxValue = 6000;

var gaugeWidth = 200;
var gaugeHeigth = 200;

var gauge = new RadialGauge({
    renderTo: 'canvas-id',
    width: gaugeWidth,
    height: gaugeHeigth,
    units: "Km/h",
    minValue: speedMinValue,
    maxValue: speedMaxValue,
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
});
gauge.draw();

var gaugeRPM = new RadialGauge({
    renderTo: 'canvas-id-rpm',
    width: gaugeWidth,
    height: gaugeHeigth,
    units: "RPM",
    minValue: rpmMinValue,
    maxValue: rpmMaxValue,
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
});
gaugeRPM.draw();

function vdu_kmh(spd){
    if(spd>=speedMinValue && spd<=speedMaxValue) {
        gauge.value = spd;
    }else
        gauge.value = getRandomInt(50, 120);
}

function vdu_rpm(spd){
    if(spd>=rpmMinValue && spd<=rpmMaxValue)
        gaugeRPM.value = spd;
    else
        gaugeRPM.value = getRandomInt(2000, 4000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Bring life to the dials
setInterval(function () {
    // Speed
    if(gauge.value>speedMinValue+10 && gaugle.value<speedMaxValue-10){
        gauge.value = gauge.value + getRandomInt(-10, 10);
    }

    if(gaugeRPM.value>rpmMinValue+200 && gaugeRPM.value<rpmMaxValue-200){
        gaugeRPM.value = gaugeRPM.value + getRandomInt(-200, 200);
    }
}, 2000);
