$(function() {
    var load_image = function(e) {
        showImage($('#car-seats').val());
        return false;
    };

    $('#car-seats').bind('change', load_image);

});



function showImage(pos, user) {

    var users = ['rui', 'hugo', 'herlander', 'roger', 'david'];
    var user = users[Math.floor(Math.random()*users.length)];

    var img_height = 110;
    var w_weight, h_weight;
    switch(pos) {
        case 'front_left':
            w_weight = 0.45;
            h_weight = 0.68;
            break;
        case 'front_right':
            w_weight = 0.45;
            h_weight = 0.38;
            break;
        case 'back_left':
            w_weight = 0.62;
            h_weight = 0.74;
            break;
        case 'back_right':
            w_weight = 0.62;
            h_weight = 0.35;
            break;
        case 'back_center':
            w_weight = 0.62;
            h_weight = 0.54;
            break;
        default:
            w_weight = 0;
            h_weight = 0;
    }

    // myImage : ID of image on which to place new image

    var image = document.getElementById('car-occupation-img');

    console.log(image.width);

    margin = 10;

    l = image.offsetLeft;
    t = image.offsetTop;
    w = image.width;
    h = image.height;

    // Location inside the image
    offX = parseInt(w_weight * w);
    offY = parseInt(h_weight * h);

    if(offX > margin) offX -= margin;
    if(offY > margin) offY -= margin;

    l += offX;
    t += offY;
    console.log(offX, offY);
    console.log(w, h);
    var newImage = document.createElement("img");
    newImage.setAttribute('src', 'static/images/' + user + '.png');
    newImage.setAttribute('class', 'overlays');
    newImage.style.left = l + "px";
    newImage.style.top = t + "px";
    //newImage.width = 115;
    newImage.height = img_height;
    document.body.appendChild(newImage);
    //$("#car_seats").html(newImage);

}

