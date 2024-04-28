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

//--- ANIMATION DES ICONES HOME PAGE ---
const homeLinks = document.querySelectorAll('.home__link');
homeLinks.forEach(link => {
    const icon = link.querySelector('img');
    link.addEventListener('mouseover' , () => {
        icon.classList.add('animate__swing');
    })
    link.addEventListener('mouseout' , () => {
        icon.classList.remove('animate__swing');
    })
})

//--- CARD PROJET REVELES AU CLICK OU HOVER ---
const projectCells = document.querySelectorAll('.project__cell');

// Fonctions gestionnaires pour le desktop
const desktopMouseOver = (event) => {
    const card = event.currentTarget.firstElementChild;
    card.style.opacity = '1';
    card.style.visibility = 'visible';
};

const desktopMouseOut = (event) => {
    const card = event.currentTarget.firstElementChild;
    card.style.opacity = '0';
    card.style.visibility = 'hidden';
};

// Fonction gestionnaire pour le mobile
const mobileClick = (event) => {
    const card = event.currentTarget.firstElementChild;
    const isVisible = card.style.visibility === 'visible';
    card.style.opacity = isVisible ? '0' : '1';
    card.style.visibility = isVisible ? 'hidden' : 'visible';
};

// Appliquer les comportements selon le type de device
const applyDesktopBehavior = () => {
    projectCells.forEach(cell => {
        cell.addEventListener('mouseover', desktopMouseOver);
        cell.addEventListener('mouseout', desktopMouseOut);
    });
};

const removeDesktopBehavior = () => {
    projectCells.forEach(cell => {
        cell.removeEventListener('mouseover', desktopMouseOver);
        cell.removeEventListener('mouseout', desktopMouseOut);
    });
};

const applyMobileBehavior = () => {
    projectCells.forEach(cell => {
        cell.addEventListener('click', mobileClick);
    });
};

const removeMobileBehavior = () => {
    projectCells.forEach(cell => {
        cell.removeEventListener('click', mobileClick);
    });
};

// Mise à jour du comportement en fonction de la taille de la fenêtre
const updateBehavior = () => {
    const currentIsDesktop = window.innerWidth > 980;
    // Suppression des comportements précédents
    removeDesktopBehavior();
    removeMobileBehavior();

    // Application des nouveaux comportements
    if (currentIsDesktop) {
        applyDesktopBehavior();
    } else {
        applyMobileBehavior();
    }
};

updateBehavior();

// Réappliquer le comportement correct lors du redimensionnement de la fenêtre
window.addEventListener('resize', updateBehavior);

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


