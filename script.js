document.addEventListener('DOMContentLoaded', function () {
    // --- Responsive Layout ---
    function updateLayout() {
        const viewportWidth = window.innerWidth;
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle');
        const aboutMeSection = document.querySelector('.about-me-section');
        const skillsGrid = document.querySelector('.skills-grid');
        const educationGrids = document.querySelectorAll('.education-grid'); // Use querySelectorAll for multiple elements
        const projectsGrid = document.querySelector('.projects-grid');

        // --- Navigation ---
        if (nav) {
            if (viewportWidth <= 768) {
                nav.style.flexDirection = 'column';
                nav.style.alignItems = 'flex-start';
                nav.querySelectorAll('li').forEach(item => {
                    item.style.marginLeft = '0';
                    item.style.marginBottom = '10px';
                });
                if (navToggle) {
                    nav.style.display = 'none'; // Initially hide on smaller screens
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
                if (navToggle) nav.style.display = 'flex'; // Show on larger screens
            }
        }

        // --- About Me Section ---
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

        // --- Skills Grid ---
        if (skillsGrid) {
            skillsGrid.style.gridTemplateColumns = viewportWidth <= 600
                ? 'repeat(auto-fit, minmax(80px, 1fr))'
                : 'repeat(auto-fit, minmax(100px, 1fr))';
        }

        // --- Education Grids ---
        educationGrids.forEach(grid => {
            grid.style.gridTemplateColumns = viewportWidth <= 600 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))';
        });

        // --- Projects Grid ---
        if (projectsGrid) {
            projectsGrid.style.gridTemplateColumns = viewportWidth <= 600 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    }

    // Initial layout and on resize
    updateLayout();
    window.addEventListener('resize', updateLayout);

    // --- Responsive Navigation (Toggle Class) ---
    const navToggleBtn = document.querySelector('.nav-toggle'); // Renamed for clarity
    const navMenu = document.querySelector('nav ul');

    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open'); // Toggle a class for mobile menu
        });

        // Close mobile menu on resize if screen is large enough
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    }

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'inline-block' : 'none';
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Welcome Loader and Content Transition ---
    const percentDisplay = document.getElementById('loading-percentage');
    const progressBar = document.getElementById('progress-bar');
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');
    const bodyElement = document.body; // Renamed for clarity

    let percentage = 0;
    const loadingInterval = setInterval(() => { // Renamed for clarity
        if (percentDisplay && progressBar) {
            percentage++;
            percentDisplay.textContent = percentage + '%';
            progressBar.style.width = percentage + '%';
        }

        if (percentage >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.style.opacity = '0';
                    setTimeout(() => {
                        loaderWrapper.style.display = 'none';
                    }, 500);
                }
                if (content) {
                    content.style.opacity = '1';
                }
                if (bodyElement) {
                    bodyElement.style.overflow = 'auto';
                }
            }, 1000);
        }
    }, 30);
});