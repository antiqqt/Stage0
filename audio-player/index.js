// Create audio-player
const audio = new Audio('assets/audio/beyonce.mp3');
audio.volume = 0.5;
const playBtn = document.querySelector('.play-button');

function playAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Play/pause toggle
function playToggle() {
  playBtn.classList.toggle('pause');
}

playBtn.addEventListener('click', () => {
  playToggle();
  playAudio();
});

// Change elements according to current song
const ALBUMCOVERS = ['lemonade', 'dontstartnow'];
const ARTISTS = ['Beyonce', 'Dua Lipa'];
const TITLES = [`Don't Hurt Yourself`, `Don't Start Now`];

const background = document.querySelector('.background');
const thumbnail = document.querySelector('.thumbnail');
const artist = document.querySelector('.song-artist');
const title = document.querySelector('.song-title');

function themeChange() {
  audio.src = `assets/audio/${SONGS[playNum]}.mp3`;
  background.src = `assets/img/${ALBUMCOVERS[playNum]}.png`;
  thumbnail.src = `assets/img/${ALBUMCOVERS[playNum]}.png`;
  artist.textContent = `${ARTISTS[playNum]}`;
  title.textContent = `${TITLES[playNum]}`;
}

// Track change
let playNum = 0;
const SONGS = ['beyonce', 'dontstartnow'];

document.querySelector('.song-next').addEventListener('click', playNext);
document.querySelector('.song-prev').addEventListener('click', playNext);

function playNext() {
  // Change track according to its number
  playNum++;
  if (playNum >= SONGS.length) {
    playNum = 0;
  }

  // Update current time
  audio.currentTime = 0;

  // Change thumbnails on page
  themeChange();

  // Keep play button in right state even
  // when we swipe through songs
  if (!playBtn.classList.contains('pause')) {
    playToggle();
  }

  playAudio();
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = SONGS.length - 1;
  }

  audio.currentTime = 0;
  themeChange();
  if (!playBtn.classList.contains('pause')) {
    playToggle();
  }
  playAudio();
}

// Update time
setInterval(() => {
  document.querySelector('.current-time').textContent = convertTime(
    audio.currentTime
  );

  document.querySelector('.total-time').textContent = convertTime(
    audio.duration
  );
}, 500);

// Time convertion
function convertTime(timeNum) {
  let seconds = Math.floor(timeNum);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  return `${minutes}:${String(seconds).padStart(2, 0)}`;
}

// Slider thumb move according to time
const progressBar = document.querySelector('.progress-bar');

setInterval(() => {
  // Update the thumb
  progressBar.max = Math.floor(audio.duration);
  progressBar.value = Math.floor(audio.currentTime);
}, 1000);

progressBar.addEventListener('input', () => {
  // Make current time correspond to slider thumb position
  audio.currentTime = progressBar.value;
});

// Volume button
const volumeBtn = document.querySelector('.volume-button');

volumeBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  volumeBtn.classList.toggle('mute');
});

// Volume slider
const volumeSlider = document.querySelector('.volume-slider');

volumeSlider.addEventListener('click', (elem) => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = elem.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector('.volume-percentage').style.width =
    newVolume * 100 + '%';
});
