var battery_charging = false;
var current_battery = 6;

function vdu_setCharging(isCharging){
    battery_charging = isCharging;
}

function vdu_switchCharging(){
    vdu_setCharging(!battery_charging);
}

function vdu_power(percentage){
    level = (percentage*0.06)
    if(level>=0 && level<=6){
        setBattery(level);
    }else{
        setBattery(getRandomInt(0, 6));
    }
}

function setBattery(level){
    current_battery = level;

    level>0 ? document.getElementById("battery6").style.visibility  = 'visible' : document.getElementById("battery6").style.visibility  = 'hidden';
    level>1 ? document.getElementById("battery5").style.visibility  = 'visible' : document.getElementById("battery5").style.visibility  = 'hidden';
    level>2 ? document.getElementById("battery4").style.visibility  = 'visible' : document.getElementById("battery4").style.visibility  = 'hidden';
    level>3 ? document.getElementById("battery3").style.visibility  = 'visible' : document.getElementById("battery3").style.visibility  = 'hidden';
    level>4 ? document.getElementById("battery2").style.visibility  = 'visible' : document.getElementById("battery2").style.visibility  = 'hidden';
    level>5 ? document.getElementById("battery1").style.visibility  = 'visible' : document.getElementById("battery1").style.visibility  = 'hidden';
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// random battery level
setInterval(function () {
    if(battery_charging){
        setBattery((current_battery+1)%7)
    }
    //document.getElementById("battery1").style.visibility  = 'hidden';
}, 300);
