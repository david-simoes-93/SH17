var rawData = 20;
var gaugeOptions = {

    chart: {
        type: 'solidgauge',
        marginTop: 0
    },

    title: null,

    pane: [{
        startAngle: -100,
        endAngle: 100,
        background: [{ // Track for Move
            outerRadius: '100%',
            innerRadius: '60%',
            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0,
            shape: 'arc'
        }],
        size: '100%',
        center: ['50%', '70%']
    }],

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#0099ff'], // blue
            [0.6, '#DF5353'] // red
        ],
        lineWidth: 10,
        minorTickInterval: null,
        tickAmount: 2
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },
    credits: {
        enabled: false
    }
};

var tempMod = 0;
var tempScu = 20;

// The Temperature gauge
var chartTemperature = Highcharts.chart('container-temperature', Highcharts.merge(gaugeOptions, {
    title: {
        text: null
    },
    chart: {
        height: 200,
        width: 200,
        backgroundColor: '#000'
    },
    yAxis: [{
        min: 14,
        max: 31,
        lineWidth: 2,
        lineColor: 'white',
        tickInterval: 2,
        labels: {
            enabled: false
        },
        minorTickWidth: 0,
        tickLength: 85,
        tickWidth: 4,
        tickColor: '#eee',
        zIndex: 6,
        stops: [
            [0.1, '#e6f2ff'], // blue
            [0.5, '#4da6ff'], // blue
            [0.9, '#DF5353'] // red
        ]
    }],


    series: [{
        animation: true,
        dataLabels: {
            format: '<div style="text-align:center;"><span style="font-size:30px;color:' +
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y}</span><br/>' +
            '<span style="font-size:15px;color:silver">ºC</span></div>',
            y: 70
        },
        borderWidth: 0,
        color: '#ggg',
        data: [rawData],
        tooltip: {
            valueSuffix: ' ºC'
        }
    }]

}));

function update_temp(){
    var tempVal = tempScu + tempMod;
    if (tempVal >= chartTemperature.yAxis[0].min && tempVal <= chartTemperature.yAxis[0].max) {
        // do nothing
    }else
        tempVal = getRandomInt(15, 30);
    chartTemperature.series[0].points[0].update(tempVal);
}

function vdu_tempMod(tmp) {
    tempMod += tmp;
    update_temp();
}

function vdu_tempScu(tmp) {
    tempScu = tmp;
    update_temp();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function () {
    client.publish("scu/temperature/in", "{\"action\": \"read\"}");
}, 60000);

client.publish("scu/temperature/in", "{\"action\": \"read\"}");

/*
// Bring life to the dials
setInterval(function () {
    // Speed
    var point, newVal;

    if (chartTemperature) {
        point = chartTemperature.series[0].points[0];
        newVal = getRandomInt(15, 30);

        point.update(newVal);
    }

}, 2000);
*/