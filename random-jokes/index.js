// Get data from quotes API
const url = 'https://api.icndb.com/jokes';
const quoteEn = document.querySelector('.quote-en');
const quoteRu = document.querySelector('.quote-ru');

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  let currentJokeIndex;
  // Change the joke
  showData(data);
  // Change text to be shared
  changeSharedText(data);
}

function showData(data) {
  let jokeIndex = randomIndex(0, data.value.length);
  currentJokeIndex = jokeIndex;
  // Remove &quote symbols
  const joke = data.value[jokeIndex].joke.replace(/&quot;/g, '"');
  quoteEn.textContent = joke;
}

function changeSharedText(data) {
  const socialShare = document.querySelector('.yandex-share');
  socialShare.setAttribute(
    'data-description',
    data.value[currentJokeIndex].joke
  );
}

// Make text and image change on button press
const button = document.querySelector('.button');

let imgCurrentIndex = 1; // save original picture index

function changeImg() {
  const mainImg = document.querySelector('.img');
  mainImg.src = `assets/img/chuck-norris-${getNewIndex()}-removebg.png`;
}

function getNewIndex() {
  let newIndex;

  do {
    newIndex = randomIndex(1, 5);
  } while (newIndex === imgCurrentIndex);

  imgCurrentIndex = newIndex;

  return newIndex;
}

function randomIndex(min, max) {
  // random num between both min and max included
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

button.addEventListener('click', changeImg);

// Change language
const switchLang = document.querySelector('.switch-input');

async function getTranslatedQuotes() {
  const quotes = 'assets/jokes/chuck-jokes-ru.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let currentRuJokeIndex;
  showRuData(data);
  changeSharedText(data);
}

function showRuData(data) {
  let jokeIndex = randomIndex(0, data.value.length);
  currentRuJokeIndex = jokeIndex;
  // Remove &quote symbols
  const joke = data.value[jokeIndex].joke.replace(/&quot;/g, '"');
  quoteRu.textContent = joke;
}

function changeSharedText(data) {
  const socialShare = document.querySelector('.yandex-share');
  socialShare.setAttribute(
    'data-description',
    data.value[currentRuJokeIndex].joke
  );
}

// Starting script
getData();
getTranslatedQuotes();

button.addEventListener('click', () => {
  getData();
  getTranslatedQuotes();
});

switchLang.addEventListener('change', () => {
  document
    .querySelectorAll('.quote')
    .forEach((e) => e.classList.toggle('visually-hidden'));
});
