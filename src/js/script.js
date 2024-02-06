//!TO DO :
    //!Factoriser le script en fonctions pour le rendre plus clean
    //!Prévoir une apparition décalée des blocs projets.

//--- TITRE DU HEADER ---

const typingLetters = [
    {letter:'M', interval:'1200'},
    {letter:'y', interval:'1400'},
    {letter:'\u00A0', interval:'1600'},
    {letter:'P', interval:'1800'},
    {letter:'o', interval:'1900'},
    {letter:'r', interval:'2000'},
    {letter:'t', interval:'2100'},
    {letter:'f', interval:'2200'},
    {letter:'o', interval:'2300'},
    {letter:'l', interval:'2400'},
    {letter:'i', interval:'2600'},
    {letter:'o', interval:'2800'},
];
const headerText = document.querySelector('#header-text');

handleHeaderTitle();
setInterval(handleHeaderTitle, 20000);

function handleHeaderTitle() {
    headerText.innerText = '';

    writeHeaderTitle();

    setTimeout(() => {
        eraseHeaderTitle()
    }, 15000); 
}

function writeHeaderTitle() {
    for (let el of typingLetters) {
        setTimeout(() => {
            headerText.innerText += el.letter
        }, el.interval);
    }
}

function eraseHeaderTitle() {
    for (let el of typingLetters) {
        setTimeout(() => {
            headerText.innerText = headerText.innerText.substring(0, headerText.innerText.length - 1);
        }, el.interval);
    }
}

//--- CURSEUR DU HEADER ---

const cursor = document.querySelector('#header-cursor');
let isCursor = true;

setInterval(cursorWinking , 500);

function cursorWinking() {
    if (isCursor) {
        cursor.style.display = 'none';
        isCursor = false;
    }
    else {
        cursor.style.display = 'block';
        isCursor = true;
    }
}

//--- MENU MOBILE ---

const menuIcon = document.querySelector('.menu-icon--mobile');
const menuMobile = document.querySelector('.header__nav--mobile');
const mainSection = document.querySelector('.main');
let isMenuActive = false;

menuIcon.addEventListener('click' , (e) => {
    if (!isMenuActive) {
        menuMobile.classList.add('open');
    }
    else {
        menuMobile.classList.remove('open');
    }    
    isMenuActive = !isMenuActive;
});

for (let section of [mainSection, menuMobile]) {
    section.addEventListener('click' , () => {
        menuMobile.classList.remove('open');
        isMenuActive = false;
    })
}

//--- CARD PROJET AU HOVER  ---

const projectCells = document.querySelectorAll('.project__cell');

projectCells.forEach((cell) => {
    cell.addEventListener('mouseover' , () => {
        const card = cell.firstElementChild;
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    })
});

projectCells.forEach((cell) => {
    cell.addEventListener('mouseout' , () => {
        const card = cell.firstElementChild;
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    })
});

//--- SCROLL SUR LA PAGE ---

const homeSection = document.querySelector('#home');
const projectsSection = document.querySelector('#projects');
const skillsSection = document.querySelector('#skills');

const navLink = document.querySelectorAll('.nav__link');
const navLinkHome = document.querySelector('.nav__link--home');
const navLinkProjects = document.querySelector('.nav__link--projects');
const navLinkSkills = document.querySelector('.nav__link--skills');

function handleMenuNavigation(navElement) {
    navLink.forEach((el) => {
        el.classList.remove('active');
    });
    navElement.classList.add('active');
}

window.addEventListener('scroll' , () => {

    let homePosition = homeSection.getBoundingClientRect();
    let projectsPosition = projectsSection.getBoundingClientRect();
    let skillsPosition = skillsSection.getBoundingClientRect();

    if (skillsPosition.top < 300) {
        handleMenuNavigation(navLinkSkills);
    }
    else if (projectsPosition.top < 300) {
        handleMenuNavigation(navLinkProjects);
    }
    else {
        handleMenuNavigation(navLinkHome);
    }   
});


