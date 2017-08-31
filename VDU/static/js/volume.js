$(function() {

    var knob = $('.knob');
    var angle = 0;
    var minangle = 0;
    var maxangle = 270;


    function setAngle() {

        // rotate knob
        $('.knob').css({
            '-moz-transform':'rotate('+angle+'deg)',
            '-webkit-transform':'rotate('+angle+'deg)',
            '-o-transform':'rotate('+angle+'deg)',
            '-ms-transform':'rotate('+angle+'deg)',
            'transform':'rotate('+angle+'deg)'
        });

        // highlight ticks
        var activeTicks = (Math.round(angle / 10) + 1);

        $('.tick').removeClass('activetick');
        $('.tick').slice(0,activeTicks).addClass('activetick');

        // update % value in text
        var pc = Math.round((angle/270)*100);
        $('.current-value').text(pc+'%');

    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // random playlist
    setInterval(function () {
        angle = getRandomInt(0, 270);
        setAngle();
    }, 1000);

});