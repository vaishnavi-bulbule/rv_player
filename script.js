// Your songs inside "music/" folder
let songs = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3"
];

let index = 0;

let audio = document.getElementById("audio");
let title = document.getElementById("title");
let progress = document.getElementById("progress");
let currentTimeText = document.getElementById("current-time");
let durationText = document.getElementById("duration");

let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

// Load the first song
function loadSong(i) {
    audio.src = songs[i];
    title.innerText = songs[i].replace("music/", "");
}

loadSong(index);

// Play / pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});

// Next song
nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

// Previous song
prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;

        let curMin = Math.floor(audio.currentTime / 60);
        let curSec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        currentTimeText.textContent = `${curMin}:${curSec}`;

        let durMin = Math.floor(audio.duration / 60);
        let durSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        durationText.textContent = `${durMin}:${durSec}`;
    }
});

// Click to seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Auto-next
audio.addEventListener("ended", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
});
