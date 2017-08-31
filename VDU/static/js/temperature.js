$(function() {

    var rawData = 20;
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            marginTop: 20
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
            size: '120%',
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

    // The Temperature gauge
    var chartTemperature = Highcharts.chart('container-temperature', Highcharts.merge(gaugeOptions, {
        title: {
            text: 'A/C Temperature',
            y: 20
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
            tickWidth: 5,
            tickColor: 'white',
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
                format: '<div style="text-align:center"><span style="font-size:50px;color:' +
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
            '<span style="font-size:22px;color:silver">ºC</span></div>'
            },
            borderWidth: 0,
            color: Highcharts.getOptions().colors[0],
            data: [rawData],
            tooltip: {
                valueSuffix: ' ºC'
            }
        }]

    }));

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Bring life to the dials
    setInterval(function () {
        // Speed
        var point, newVal;

        if (true) {
            point = chartTemperature.series[0].points[0];
            newVal = getRandomInt(15, 30);

            point.update(newVal);
        }

    }, 2000);
});