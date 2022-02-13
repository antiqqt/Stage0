// Get data from quotes API
const url = 'https://api.icndb.com/jokes/random';
const quote = document.querySelector('.quote');

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  // Change the joke
  showData(data);
  // Change text to be shared
  changeSharedText(data);
  console.log(data);
}
getData();

function showData(data) {
  quote.textContent = data.value.joke;
}

function changeSharedText(data) {
  const socialShare = document.querySelector('.yandex-share');
  socialShare.setAttribute('data-title', data.value.joke);
}

// Make text change when button is pressed
const button = document.querySelector('.button');

button.addEventListener('click', getData);
