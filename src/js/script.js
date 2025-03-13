//--- TITRE DU HEADER ---

const typingLettersTitle1 = [
  { letter: "P", interval: "1200" },
  { letter: "o", interval: "1400" },
  { letter: "r", interval: "1500" },
  { letter: "t", interval: "1700" },
  { letter: "f", interval: "1900" },
  { letter: "o", interval: "2000" },
  { letter: "l", interval: "2100" },
  { letter: "i", interval: "2300" },
  { letter: "o", interval: "2400" },
];

const typingLettersTitle2 = [
  { letter: "A", interval: "1200" },
  { letter: "n", interval: "1350" },
  { letter: "t", interval: "1500" },
  { letter: "o", interval: "1600" },
  { letter: "i", interval: "1700" },
  { letter: "n", interval: "1900" },
  { letter: "e", interval: "2100" },
  { letter: "\u00A0", interval: "2500" },
  { letter: "G", interval: "2600" },
  { letter: "r", interval: "2750" },
  { letter: "u", interval: "2900" },
  { letter: "b", interval: "3000" },
  { letter: "e", interval: "3200" },
  { letter: "r", interval: "3300" },
  { letter: "t", interval: "3400" },
];

const typingLettersTitle3 = [
  { letter: "W", interval: "1200" },
  { letter: "e", interval: "1400" },
  { letter: "b", interval: "1600" },
  { letter: "\u00A0", interval: "1800" },
  { letter: "D", interval: "2000" },
  { letter: "e", interval: "2100" },
  { letter: "v", interval: "2200" },
  { letter: "e", interval: "2300" },
  { letter: "l", interval: "2500" },
  { letter: "o", interval: "2600" },
  { letter: "p", interval: "2850" },
  { letter: "e", interval: "3000" },
  { letter: "r", interval: "3100" },
];
const typingTitles = [
  typingLettersTitle1,
  typingLettersTitle2,
  typingLettersTitle3,
];
let currentIndex = 0;

const headerText = document.querySelector("#header-text");

handleHeaderTitle();
setInterval(handleHeaderTitle, 15000);

function handleHeaderTitle() {
  headerText.innerText = "";

  const currentTypingTitle = typingTitles[currentIndex];
  currentIndex = (currentIndex + 1) % typingTitles.length;

  writeHeaderTitle(currentTypingTitle);

  setTimeout(() => {
    eraseHeaderTitle(currentTypingTitle);
  }, 7000);
}

function writeHeaderTitle(typingLetters) {
  typingLetters.forEach((el) => {
    setTimeout(() => {
      headerText.innerText += el.letter;
    }, el.interval);
  });
}

function eraseHeaderTitle(typingLetters) {
  typingLetters.forEach((el) => {
    setTimeout(() => {
      headerText.innerText = headerText.innerText.substring(
        0,
        headerText.innerText.length - 1
      );
    }, el.interval);
  });
}

//--- CURSEUR DU HEADER ---

const cursor = document.querySelector("#header-cursor");
let isCursor = true;

setInterval(cursorWinking, 500);

function cursorWinking() {
  if (isCursor) {
    cursor.style.display = "none";
    isCursor = false;
  } else {
    cursor.style.display = "block";
    isCursor = true;
  }
}

//--- MENU MOBILE ---

const menuIcon = document.querySelector(".menu-icon--mobile");
const menuMobile = document.querySelector(".header__nav--mobile");
const mainSection = document.querySelector(".main");
let isMenuActive = false;

menuIcon.addEventListener("click", (e) => {
  if (!isMenuActive) {
    menuMobile.classList.add("open");
  } else {
    menuMobile.classList.remove("open");
  }
  isMenuActive = !isMenuActive;
});

for (let section of [mainSection, menuMobile]) {
  section.addEventListener("click", () => {
    menuMobile.classList.remove("open");
    isMenuActive = false;
  });
}

//--- ANIMATION DES ICONES HOME PAGE ---
const homeLinks = document.querySelectorAll(".home__link");
homeLinks.forEach((link) => {
  const icon = link.querySelector("img");
  link.addEventListener("mouseover", () => {
    icon.classList.add("animate__swing");
  });
  link.addEventListener("mouseout", () => {
    icon.classList.remove("animate__swing");
  });
});

//--- CARD PROJET REVELES AU CLICK OU HOVER ---
const projectCells = document.querySelectorAll(".project__cell");

// Fonctions gestionnaires pour le desktop
const desktopMouseOver = (event) => {
  const card = event.currentTarget.firstElementChild;
  card.style.opacity = "1";
  card.style.visibility = "visible";
};

const desktopMouseOut = (event) => {
  const card = event.currentTarget.firstElementChild;
  card.style.opacity = "0";
  card.style.visibility = "hidden";
};

// Fonction gestionnaire pour le mobile
const mobileClick = (event) => {
  const card = event.currentTarget.firstElementChild;
  const isVisible = card.style.visibility === "visible";
  card.style.opacity = isVisible ? "0" : "1";
  card.style.visibility = isVisible ? "hidden" : "visible";
};

// Appliquer les comportements selon le type de device
const applyDesktopBehavior = () => {
  projectCells.forEach((cell) => {
    cell.addEventListener("mouseover", desktopMouseOver);
    cell.addEventListener("mouseout", desktopMouseOut);
  });
};

const removeDesktopBehavior = () => {
  projectCells.forEach((cell) => {
    cell.removeEventListener("mouseover", desktopMouseOver);
    cell.removeEventListener("mouseout", desktopMouseOut);
  });
};

const applyMobileBehavior = () => {
  projectCells.forEach((cell) => {
    cell.addEventListener("click", mobileClick);
  });
};

const removeMobileBehavior = () => {
  projectCells.forEach((cell) => {
    cell.removeEventListener("click", mobileClick);
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
window.addEventListener("resize", updateBehavior);

//--- SCROLL SUR LA PAGE ---

const homeSection = document.querySelector("#home");
const projectsSection = document.querySelector("#projects");
const skillsSection = document.querySelector("#skills");

const navLink = document.querySelectorAll(".nav__link");
const navLinkHome = document.querySelector(".nav__link--home");
const navLinkProjects = document.querySelector(".nav__link--projects");
const navLinkSkills = document.querySelector(".nav__link--skills");

function handleMenuNavigation(navElement) {
  navLink.forEach((el) => {
    el.classList.remove("active");
  });
  navElement.classList.add("active");
}

window.addEventListener("scroll", () => {
  let homePosition = homeSection.getBoundingClientRect();
  let projectsPosition = projectsSection.getBoundingClientRect();
  let skillsPosition = skillsSection.getBoundingClientRect();

  if (skillsPosition.top < 300) {
    handleMenuNavigation(navLinkSkills);
  } else if (projectsPosition.top < 300) {
    handleMenuNavigation(navLinkProjects);
  } else {
    handleMenuNavigation(navLinkHome);
  }
});
