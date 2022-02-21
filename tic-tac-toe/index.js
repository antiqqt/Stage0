// Constants
const CROSS_CLASS = 'cross';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];
// Game flow
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
let circleTurn = false;
const winningMessage = document.querySelector('.winning-message');
const gameInfo = document.querySelector('.game-info');
const restartButton = document.querySelector('.restart-button');
const turns = document.querySelector('.turns');
let actionCount = 0;

// Restart the game
restartButton.addEventListener('click', resetGame);

function resetGame() {
  gameInfo.classList.add('visually-hidden');
  cells.forEach((cell) => {
    cell.classList.remove(CROSS_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
  });
  // Reset actions
  actionCount = 0;
  // Start anew
  startGame();
}

// Start the game
startGame();

function startGame() {
  // Set up the game
  circleTurn = false;
  cells.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardClass();
}

// Main handler
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
  // Place mark on target cell
  placeMark(cell, currentClass);
  // Play game sound;
  playSound(gameSound);
  // Update actions count
  updateActionCount();
  // Check for win
  if (checkwin(currentClass)) {
    endGame(false);
  }
  // If there isn't a winner, check for draw
  else if (isDraw()) {
    endGame(true);
  }
  // If it's not a draw, change players and resume
  else {
    swapTurns();
    setBoardClass();
  }
}

function placeMark(cell, currentClass) {
  // Mark the cell
  cell.classList.add(currentClass);
}

function swapTurns() {
  // Set turn to opposite one
  circleTurn = !circleTurn;
}

function setBoardClass() {
  // Remove active board class
  board.classList.remove(CROSS_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  // Set new active board class
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(CROSS_CLASS);
  }
}

function checkwin(currentClass) {
  // If every element of any win combination
  // belongs to current class, it's a win for current class
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  // If every cell has any class, it's a draw
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(CROSS_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = 'Draw!';
  } else {
    winningMessage.innerText = `${circleTurn ? 'O' : 'X'}'s win!`;
  }
  // Update number of curent turns
  updateTurnsInfo();
  // Make overlay visible
  gameInfo.classList.remove('visually-hidden');
}

function updateActionCount() {
  actionCount++;
}

function updateTurnsInfo() {
  let turnsCount = Math.ceil(actionCount / 2);
  turns.innerText = `Number of turns: ${turnsCount}`;
}

// MUSIC

// Game sounds
const gameSound = new Audio('assets/sounds/click_sound.mp3');
gameSound.id = 'sound';
gameSound.volume = 0.4;
const gameSoundBtn = document.querySelector('.button-sound');
const gameSoundIcon = document.querySelector('.icon-sound');

gameSoundBtn.addEventListener('click', gameSoundHandleClick);

function gameSoundHandleClick() {
  MuteToggle(gameSound);
  ChangeImage(gameSound, gameSoundIcon);
}

// Background music
const musicSound = new Audio('assets/sounds/background_music.mp3');
musicSound.id = 'music';
musicSound.volume = 0.1;
musicSound.muted = true;
musicSound.loop = true;
musicSound.play();
const musicSoundBtn = document.querySelector('.button-music');
const musicSoundIcon = document.querySelector('.icon-music');

musicSoundBtn.addEventListener('click', musicSoundHandleClick);

function musicSoundHandleClick() {
  MuteToggle(musicSound);
  ChangeImage(musicSound, musicSoundIcon);
}

// Sound control functions
function MuteToggle(audioPlayer) {
  audioPlayer.muted = !audioPlayer.muted;
}

function ChangeImage(audioPlayer, audioPlayerIcon) {
  let newId = audioPlayer.id;
  let newState = getNewState(audioPlayer);
  audioPlayerIcon.href.baseVal = `assets/svg/sprite_game_menu.svg#${newId}_${newState}`;
}

function getNewState(audioPlayer) {
  let newSrc;
  if (audioPlayer.muted) {
    newSrc = 'off';
  } else {
    newSrc = 'on';
  }
  return newSrc;
}

function playSound(audioPlayer) {
  audioPlayer.play();
}
