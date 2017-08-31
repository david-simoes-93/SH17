$(function() {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // random battery level
    setInterval(function () {
    	newVal = getRandomInt(0, 6);
        newVal>0 ? document.getElementById("battery6").style.visibility  = 'visible' : document.getElementById("battery6").style.visibility  = 'hidden';
        newVal>1 ? document.getElementById("battery5").style.visibility  = 'visible' : document.getElementById("battery5").style.visibility  = 'hidden';
        newVal>2 ? document.getElementById("battery4").style.visibility  = 'visible' : document.getElementById("battery4").style.visibility  = 'hidden';
        newVal>3 ? document.getElementById("battery3").style.visibility  = 'visible' : document.getElementById("battery3").style.visibility  = 'hidden';
        newVal>4 ? document.getElementById("battery2").style.visibility  = 'visible' : document.getElementById("battery2").style.visibility  = 'hidden';
        newVal>5 ? document.getElementById("battery1").style.visibility  = 'visible' : document.getElementById("battery1").style.visibility  = 'hidden';

        //document.getElementById("battery1").style.visibility  = 'hidden';
    }, 1000);
});