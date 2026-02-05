// Variables globales
let songs = [];
let currentSong = null;

// Éléments DOM
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const nowPlaying = document.getElementById('nowPlaying');

// Événements
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file.type.startsWith('audio/')) {
            addSong(file);
        }
    });
});

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '⏸';
    } else {
        audioPlayer.pause();
        playBtn.textContent = '▶';
    }
});

// Fonctions
function addSong(file) {
    const songUrl = URL.createObjectURL(file);
    const song = {
        id: Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: songUrl,
        file: file
    };
    
    songs.push(song);
    displaySongs();
    
    // Si c'est la première chanson, la jouer
    if (songs.length === 1) {
        playSong(song);
    }
}

function displaySongs() {
    if (songs.length === 0) {
        songList.innerHTML = '<p class="empty">Aucune musique... Ajoutez-en !</p>';
        return;
    }
    
    let html = '';
    songs.forEach((song, index) => {
        html += `
            <div class="song-item" onclick="playSong(songs[${index}])">
                <span>${index + 1}. ${song.name}</span>
                <span>▶</span>
            </div>
        `;
    });
    
    songList.innerHTML = html;
}

function playSong(song) {
    currentSong = song;
    audioPlayer.src = song.url;
    audioPlayer.play();
    playBtn.textContent = '⏸';
    nowPlaying.textContent = `🎵 ${song.name}`;
}

// Initialisation
console.log('SONICBOX - Lecteur Audio chargé !');