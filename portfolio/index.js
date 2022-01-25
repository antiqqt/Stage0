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
navLink.forEach(elem => {
  elem.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
    menuOpen = false;
  });
})


console.log(`Вёрстка соответствует макету. Ширина экрана 768px +48
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. 
Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
На ширине экрана 768рх и меньше реализовано адаптивное меню +22
85/75`);