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

const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
let circleTurn = false;
const winningMessage = document.querySelector('.winning-message');
const gameInfo = document.querySelector('.game-info');
const restartButton = document.querySelector('.restart-button');

// Restart the game
restartButton.addEventListener('click', resetGame);

function resetGame() {
  gameInfo.classList.add('visually-hidden');
  cells.forEach((cell) => {
    cell.classList.remove(CROSS_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
  });
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
  gameInfo.classList.remove('visually-hidden');
}
