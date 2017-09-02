song_paths = ['static/media/lucky.mp3',
    'static/media/holdon.mp3',
    'static/media/electro.mp3',
    'static/media/airp.mp3',
    'static/media/bohemian.mp3'];
song_index = 0;

function vdu_playSong(){
    document.getElementById("songs_control").play();
}

function vdu_pauseSong(){
    document.getElementById("songs_control").pause();
}

function vdu_nextSong(){
    song_index = (song_index + 1)%song_paths.length;

    document.getElementById("songs_src").src = song_paths[song_index];
    document.getElementById("songs_control").load();
    vdu_playSong();
}

function vdu_prevSong(){
    song_index = song_index - 1;
    if(song_index<0) song_index = song_paths.length-1;

    document.getElementById("songs_src").src = song_paths[song_index];
    document.getElementById("songs_control").load();
    vdu_playSong();
}