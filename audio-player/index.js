// Create audio-player
const audio = new Audio('/assets/audio/beyonce.mp3');
const playBtn = document.querySelector('.play-button');


function playAudio() {
  audio.currentTime = 0;
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
  audio.src = `/assets/audio/${SONGS[playNum]}.mp3`;
  background.src = `/assets/img/${ALBUMCOVERS[playNum]}.png`;
  thumbnail.src = `/assets/img/${ALBUMCOVERS[playNum]}.png`;
  artist.textContent = `${ARTISTS[playNum]}`;
  title.textContent = `${TITLES[playNum]}`;
}

// Track change
let playNum = 0;
const SONGS = ['beyonce', 'dontstartnow'];

function playNext() {
  playNum++;
  if (playNum >= SONGS.length) {
    playNum = 0;
  }
  
  themeChange();

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

  themeChange();

  if (!playBtn.classList.contains('pause')) {
    playToggle();
  }

  playAudio();
}

document.querySelector('.song-next').addEventListener('click', playNext);
document.querySelector('.song-prev').addEventListener('click', playNext);
