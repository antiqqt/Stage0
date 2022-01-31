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

switchLng.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    // Clean all btns and make current active
    switchBtns.forEach((btn) => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Translate the page
    getTranslate(event.target.textContent);
  });
});

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
let lightThemeActive = false;

themeSwitchBtn.addEventListener('click', () => {
  if (lightThemeActive) {
    themeChangeElements.forEach((elem) => {
      elem.classList.remove('light-theme');
    });
    lightThemeActive = false;
  } else {
    themeChangeElements.forEach((elem) => {
      elem.classList.add('light-theme');
    });
    lightThemeActive = true;
  }
});

console.log(`Вёрстка соответствует макету. Ширина экрана 768px +48
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. 
Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
На ширине экрана 768рх и меньше реализовано адаптивное меню +22
85/75`);
