// Load portfolio data
let portfolioData = null;

// Fetch data from JSON
async function loadData() {
  try {
    const response = await fetch('./data.json');
    portfolioData = await response.json();
    initializePortfolio();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Initialize portfolio with data
function initializePortfolio() {
  if (!portfolioData) return;

  // Initialize each section
  initializeHeader();
  initializeHome();
  initializeProjects();
  initializeSkills();
  initializeAbout();
  initializeFooter();
  initializeNavigation();
}

// Header typing animation
function initializeHeader() {
  const typingTitles = [
    "Portfolio",
    "Antoine Grb",
    "Développeur Web"
  ];
  let currentIndex = 0;
  const headerText = document.getElementById('header-text');

  function typeTitle(title) {
    let charIndex = 0;
    headerText.textContent = '';

    const typeInterval = setInterval(() => {
      if (charIndex < title.length) {
        headerText.textContent += title[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => eraseTitle(title), 3000);
      }
    }, 100);
  }

  function eraseTitle(title) {
    let charIndex = title.length;

    const eraseInterval = setInterval(() => {
      if (charIndex > 0) {
        headerText.textContent = title.substring(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(eraseInterval);
        currentIndex = (currentIndex + 1) % typingTitles.length;
        setTimeout(() => typeTitle(typingTitles[currentIndex]), 500);
      }
    }, 50);
  }

  typeTitle(typingTitles[currentIndex]);
}

// Home section
function initializeHome() {
  const { profile } = portfolioData;

  document.getElementById('home-greeting').textContent = profile.greeting;
  document.getElementById('home-name').textContent = profile.firstName;
  document.getElementById('home-title').textContent = profile.title;
  document.getElementById('profile-image').src = profile.profileImage;

  // Social links
  const linksContainer = document.getElementById('home-links');
  const links = [
    { href: profile.github, icon: profile.icons.github, label: 'Github' },
    { href: profile.linkedin, icon: profile.icons.linkedin, label: 'Linkedin' },
    { href: `mailto:${profile.email}`, icon: profile.icons.email, label: profile.email }
  ];

  links.forEach((link, index) => {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    linkEl.target = link.href.startsWith('mailto:') ? '_self' : '_blank';
    linkEl.className = 'flex items-center space-x-3 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group';
    linkEl.style.animationDelay = `${0.5 + index * 0.1}s`;

    linkEl.innerHTML = `
      <img src="${link.icon}" alt="${link.label}" class="w-6 h-6 transition-transform group-hover:scale-110" />
      <span class="text-gray-700 font-medium">${link.label}</span>
    `;

    linksContainer.appendChild(linkEl);
  });
}

// Projects section
function initializeProjects() {
  const { projects, profile } = portfolioData;
  let currentType = 'professional';

  const toggle = document.getElementById('project-toggle');
  const grid = document.getElementById('projects-grid');

  // Toggle functionality
  toggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-option')) {
      const type = e.target.dataset.type;
      if (type !== currentType) {
        currentType = type;
        toggle.classList.toggle('right');

        document.querySelectorAll('#project-toggle .toggle-option').forEach(opt => {
          opt.classList.toggle('active');
        });

        renderProjects(projects[currentType]);
      }
    }
  });

  function renderProjects(projectList) {
    // Fade out animation
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(20px)';

    setTimeout(() => {
      grid.innerHTML = '';

      projectList.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card bg-white rounded-xl shadow-lg overflow-hidden';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        const imageUrl = project.image || 'https://via.placeholder.com/400x200?text=' + project.name;

        card.innerHTML = `
          <div class="relative h-48 bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden">
            <img src="${imageUrl}" alt="${project.name}" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            <div class="absolute top-4 right-4 flex space-x-2">
              ${project.github ? `
                <a href="${project.github}" target="_blank" class="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <img src="${profile.icons.github}" alt="Github" class="w-5 h-5" />
                </a>
              ` : ''}
              ${project.website ? `
                <a href="${project.website}" target="_blank" class="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <img src="${profile.icons.link}" alt="Website" class="w-5 h-5" />
                </a>
              ` : ''}
            </div>
          </div>
          <div class="p-6 space-y-4">
            <h3 class="text-2xl font-bold text-gray-800">${project.name}</h3>
            <p class="text-sm text-gray-500">${project.date}</p>
            <p class="text-gray-600 leading-relaxed">${project.description}</p>
            <div class="flex flex-wrap gap-2">
              ${project.technologies.map(tech => `
                <span class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium" style="background-color: ${tech.color}20; color: ${tech.color}">
                  <span class="w-2 h-2 rounded-full" style="background-color: ${tech.color}"></span>
                  <span>${tech.name}</span>
                </span>
              `).join('')}
            </div>
          </div>
        `;

        grid.appendChild(card);

        // Animate card appearance
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });

      // Fade in grid
      setTimeout(() => {
        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }

  // Initial render
  renderProjects(projects.professional);
}

// Skills section
function initializeSkills() {
  const { skills } = portfolioData;
  let showAll = false;

  const toggle = document.getElementById('skills-toggle');
  const grid = document.getElementById('skills-grid');

  // Toggle functionality
  toggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-option')) {
      const type = e.target.dataset.type;
      const shouldShowAll = type === 'all';

      if (shouldShowAll !== showAll) {
        showAll = shouldShowAll;
        toggle.classList.toggle('right');

        document.querySelectorAll('#skills-toggle .toggle-option').forEach(opt => {
          opt.classList.toggle('active');
        });

        renderSkills();
      }
    }
  });

  function renderSkills() {
    const skillsToShow = showAll
      ? [...skills.preferred, ...skills.additional]
      : skills.preferred;

    // Fade out animation
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(20px)';

    setTimeout(() => {
      grid.innerHTML = '';

      skillsToShow.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-card bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-xl transition-all';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';

        card.innerHTML = `
          <img src="${skill.icon}" alt="${skill.name}" class="w-16 h-16 object-contain" />
          <p class="text-center font-semibold text-gray-800">${skill.name}</p>
        `;

        grid.appendChild(card);

        // Animate appearance
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, index * 50);
      });

      // Fade in grid
      setTimeout(() => {
        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }

  // Initial render
  renderSkills();
}

// About section
function initializeAbout() {
  const { timeline, profile, skills_from_experience } = portfolioData;

  // Timeline
  const timelineContainer = document.getElementById('timeline');
  timeline.forEach((item, index) => {
    const isTop = item.position === 'top';
    const itemDiv = document.createElement('div');
    itemDiv.className = `timeline-item flex flex-col ${isTop ? 'items-center' : 'items-center justify-end'} relative`;
    itemDiv.style.gridColumn = index + 1;
    itemDiv.style.gridRow = '1';

    itemDiv.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow" style="width: 200px;">
        <p class="text-xl font-bold gradient-text mb-2">${item.year}</p>
        <p class="font-semibold text-gray-800 mb-1 text-sm">${item.title}</p>
        <p class="text-xs text-gray-600">${item.description}</p>
      </div>
    `;

    // Position content above or below the line
    if (isTop) {
      itemDiv.style.alignItems = 'center';
      itemDiv.style.paddingBottom = '120px';
    } else {
      itemDiv.style.alignItems = 'center';
      itemDiv.style.paddingTop = '120px';
    }

    timelineContainer.appendChild(itemDiv);
  });

  // Bio
  document.getElementById('about-bio').textContent = profile.bio;

  // Experience skills
  const experienceContainer = document.getElementById('experience-skills');
  const iconMap = {
    'users': 'fa-users',
    'check-circle': 'fa-circle-check',
    'cpu': 'fa-microchip'
  };

  skills_from_experience.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1';

    card.innerHTML = `
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
          <i class="fas ${iconMap[skill.icon]} text-3xl text-white"></i>
        </div>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-3 text-center">${skill.title}</h3>
      <p class="text-gray-600 text-center leading-relaxed">${skill.description}</p>
    `;

    experienceContainer.appendChild(card);
  });
}

// Footer
function initializeFooter() {
  const { profile } = portfolioData;

  document.getElementById('footer-avatar').src = profile.footer.avatar;
  document.getElementById('footer-name').textContent = profile.name;
  document.getElementById('footer-description').textContent = profile.footer.description;
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Footer links
  const linksContainer = document.getElementById('footer-links');
  const links = [
    { href: profile.github, icon: profile.icons.githubFooter, label: 'Github' },
    { href: profile.linkedin, icon: profile.icons.linkedinFooter, label: 'Linkedin' }
  ];

  links.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    linkEl.target = '_blank';
    linkEl.className = 'hover:opacity-75 transition-opacity';
    linkEl.innerHTML = `<img src="${link.icon}" alt="${link.label}" class="w-8 h-8" />`;
    linksContainer.appendChild(linkEl);
  });
}

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    icon.className = isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      isMenuOpen = false;
      mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-primary');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-primary');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);
