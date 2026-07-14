const audio = document.getElementById("audio");

const songList = document.getElementById("songList");

const cover = document.getElementById("cover");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("play");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const search = document.getElementById("search");

let currentSong = 0;

let playing = false;

/*==============================
        CARGAR PLAYLIST
==============================*/

function loadPlaylist() {

    songList.innerHTML = "";

    playlist.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent = `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });

        songList.appendChild(li);

    });

}

/*==============================
        CARGAR CANCIÓN
==============================*/

function loadSong(index) {

    currentSong = index;

    const song = playlist[index];

    audio.src = song.file;

    cover.src = song.cover;

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    document.querySelectorAll("#songList li").forEach(li => {

        li.classList.remove("active");

    });

    document.querySelectorAll("#songList li")[index].classList.add("active");

}

/*==============================
        PLAY
==============================*/

function playSong() {

    audio.play();

    playing = true;

    playBtn.textContent = "⏸";

}

/*==============================
        PAUSA
==============================*/

function pauseSong() {

    audio.pause();

    playing = false;

    playBtn.textContent = "▶";

}

/*==============================
        BOTÓN PLAY
==============================*/

playBtn.addEventListener("click", () => {

    if (playing) {

        pauseSong();

    } else {

        playSong();

    }

});

/*==============================
        SIGUIENTE
==============================*/

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= playlist.length)
        currentSong = 0;

    loadSong(currentSong);

    playSong();

});

/*==============================
        ANTERIOR
==============================*/

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0)
        currentSong = playlist.length - 1;

    loadSong(currentSong);

    playSong();

});

/*==============================
        BARRA DE PROGRESO
==============================*/

audio.addEventListener("timeupdate", () => {

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

    duration.textContent = formatTime(audio.duration);

});

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

/*==============================
        VOLUMEN
==============================*/

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

/*==============================
        AL TERMINAR
==============================*/

audio.addEventListener("ended", () => {

    nextBtn.click();

});

/*==============================
        BUSCADOR
==============================*/

search.addEventListener("keyup", () => {

    const text = search.value.toLowerCase();

    document.querySelectorAll("#songList li").forEach(li => {

        li.style.display = li.textContent.toLowerCase().includes(text)

            ? "block"

            : "none";

    });

});

/*==============================
        FORMATO TIEMPO
==============================*/

function formatTime(seconds) {

    if (isNaN(seconds))
        return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;

}

/*==============================
        INICIO
==============================*/

loadPlaylist();

loadSong(0);