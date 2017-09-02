var playlists = [
    '<iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
    '<iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX35oM5SPECmN" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
    '<iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX4wta20PHgwo" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
    '<iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWXRqgorJj26U" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
    '<iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX83I5je4W4rP&theme=white" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
]

function vdu_spotify(id){
    if(id>=0 && id<playlists.length){
        document.getElementById("spotify").innerHTML=playlists[id];
    }else{
        document.getElementById("spotify").innerHTML=playlists[getRandomInt(0, playlists.length-1)];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
// random playlist
setInterval(function () {
    newVal = getRandomInt(0, playlists.length-1);
    document.getElementById("spotify").innerHTML=playlists[newVal];
}, 10000);
*/