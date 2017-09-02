
var knob = $('.knob');
var angle = 135;
var minangle = 0;
var maxangle = 270;
var mod = 0;

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

function vdu_volume(mod){
    angle = angle + mod;
    if(angle>270) angle=270;
    if(angle<0) angle=0;

    setAngle();
}

setAngle();
// random playlist
/*setInterval(function () {
    angle = getRandomInt(0, 270);
    setAngle();
}, 1000);
*/