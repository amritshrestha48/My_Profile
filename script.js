// script.js
document.addEventListener('DOMContentLoaded', function () {
    function updateLayout() {
        const viewportWidth = window.innerWidth;
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle');

        // Navigation layout
        if (viewportWidth <= 768) {
            nav.style.flexDirection = 'column';
            nav.style.alignItems = 'flex-start';
            nav.querySelectorAll('li').forEach(item => {
                item.style.marginLeft = '0';
                item.style.marginBottom = '10px';
            });
            if (navToggle) {
                nav.style.display = 'none';
                navToggle.onclick = () => {
                    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
                };
            }
        } else {
            nav.style.flexDirection = 'row';
            nav.style.alignItems = 'center';
            nav.querySelectorAll('li').forEach((item, index) => {
                item.style.marginLeft = index > 0 ? '20px' : '0';
                item.style.marginBottom = '0';
            });
            if (navToggle) nav.style.display = 'flex';
        }

        // About Me layout
        const aboutMeSection = document.querySelector('.about-me-section');
        if (aboutMeSection) {
            aboutMeSection.style.flexDirection = viewportWidth <= 768 ? 'column' : 'row';
            const imageDiv = aboutMeSection.querySelector('.about-me-image');
            const textDiv = aboutMeSection.querySelector('.about-me-text');
            if (imageDiv) {
                imageDiv.style.marginRight = viewportWidth <= 768 ? '0' : '40px';
                imageDiv.style.marginBottom = viewportWidth <= 768 ? '20px' : '0';
            }
            if (textDiv) textDiv.style.textAlign = 'left';
        }

        // Skills Grid
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.style.gridTemplateColumns = viewportWidth <= 600
                ? 'repeat(auto-fit, minmax(80px, 1fr))'
                : 'repeat(auto-fit, minmax(100px, 1fr))';
        }

        // Education Grid
        document.querySelectorAll('.education-grid').forEach(grid => {
            grid.style.gridTemplateColumns = viewportWidth <= 600
                ? '1fr'
                : 'repeat(auto-fit, minmax(300px, 1fr))';
        });

        // Projects Grid
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.style.gridTemplateColumns = viewportWidth <= 600
                ? '1fr'
                : 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
});

//scroll topbtn
document.addEventListener('DOMContentLoaded', function() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Show/hide the button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) { // Adjust the scroll threshold as needed
      scrollTopBtn.style.display = 'inline-block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  // Smooth scrolling to the top when the button is clicked
  scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// welcome

document.addEventListener('DOMContentLoaded', function () {
  const percentDisplay = document.getElementById('loading-percentage');
  const progressBar = document.getElementById('progress-bar');
  const loaderWrapper = document.getElementById('loader-wrapper');
  const content = document.getElementById('content');

  let percent = 0;
  const interval = setInterval(() => {
    percent++;
    percentDisplay.textContent = percent + '%';
    progressBar.style.width = percent + '%';

    if (percent >= 100) {
      clearInterval(interval);
      loaderWrapper.style.display = 'none';
      content.style.display = 'block';
      content.classList.remove('hidden');
      content.classList.add('visible');
    }
  }, 30) // Adjust for speed
});
