// Fetch data from local storage
let lang = localStorage.getItem('lang') || 'en';
let theme = localStorage.getItem('theme') || 'dark';

function getLocalStorage() {
  if (localStorage.getItem('lang') === 'ru') {
    const langStored = localStorage.getItem('lang');

    switchBtns.forEach((btn) => btn.classList.remove('active'));
    document.querySelector('.check-ru').classList.add('active');

    getTranslate(langStored);
  }

  if (localStorage.getItem('theme') === 'light') {
    console.log(localStorage.getItem('theme'));
    themeChangeElements.forEach((elem) => {
      elem.classList.toggle('light-theme');
    });
  }
}
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

// Adaptive hamburger menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    nav.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
    menuOpen = false;
  }
});

const navLink = document.querySelectorAll('.nav-link');
navLink.forEach((elem) => {
  elem.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
    menuOpen = false;
  });
});

// Change images in Portfolio
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioBtnsBlock = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-img');

portfolioBtnsBlock.addEventListener('click', changeImage);

function changeImage(event) {
  const activeBtn = event.target;
  const season = event.target.dataset.season;

  if (activeBtn.classList.contains('portfolio-btn')) {
    // Clear active button and assign active state to the current one
    portfolioBtns.forEach((btn) => btn.classList.remove('active'));
    activeBtn.classList.add('active');

    // Change images
    portfolioImages.forEach((img, index) => {
      img.src = `./assets/img/${season}/${index + 1}.jpg`;
    });
  }
}

// Cache images
const seasons = ['winter', 'spring', 'summer', 'autumn'];

preloadSummerImages();

function preloadSummerImages() {
  seasons.forEach((szn) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${szn}/${i}.jpg`;
    }
  });
}

// Page translation
import i18Obj from './assets/translation/translate.js';
const switchLng = document.querySelectorAll('.switch-lng-check');
const switchBtns = document.querySelectorAll('.switch-lng-check');
const textElements = document.querySelectorAll('[data-i18]');

changeLng();

function changeLng() {
  switchLng.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      // Clean all btns and make current active
      switchBtns.forEach((btn) => btn.classList.remove('active'));
      event.target.classList.add('active');

      // Set user lang preference
      lang === 'en' ? (lang = 'ru') : (lang = 'en');

      // Translate the page
      getTranslate(event.target.textContent);
    });
  });
}

function getTranslate(lang) {
  const textElements = document.querySelectorAll('[data-i18]');

  textElements.forEach((elem) => {
    if (i18Obj[lang][elem.dataset.i18]) {
      if (elem.placeholder) {
        console.log(elem.textContent);
        elem.placeholder = `${i18Obj[lang][elem.dataset.i18]}`;
      } else {
        elem.textContent = `${i18Obj[lang][elem.dataset.i18]}`;
      }
    }
  });
}

// Dark-light theme change
const themeChangeElements = document.querySelectorAll('.theme-change');
const themeSwitchBtn = document.querySelector('.switch-theme');

changeTheme();

function changeTheme() {
  themeSwitchBtn.addEventListener('click', () => {
    // Set user theme preference
    theme === 'dark' ? (theme = 'light') : (theme = 'dark');

    // Change theme
    themeChangeElements.forEach((elem) => {
      elem.classList.toggle('light-theme');
    });
  });
}

console.log(`Смена изображений в секции portfolio +25
Перевод страницы на два языка +25
Переключение светлой и тёмной темы +25
Дополнительный функционал: язык отображения страницы и тема сохраняются при перезагрузке  +5
Дополнительный функционал: сложные эффекты для кнопок +5
85/75`);
