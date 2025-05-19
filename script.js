document.addEventListener('DOMContentLoaded', function () {
    // --- Responsive Layout ---
    function updateLayout() {
        const viewportWidth = window.innerWidth;
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle');

        if (nav) {
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
        }

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

        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.style.gridTemplateColumns = viewportWidth <= 600
                ? 'repeat(auto-fit, minmax(80px, 1fr))'
                : 'repeat(auto-fit, minmax(100px, 1fr))';
        }

        document.querySelectorAll('.education-grid').forEach(grid => {
            grid.style.gridTemplateColumns = viewportWidth <= 600
                ? '1fr'
                : 'repeat(auto-fit, minmax(300px, 1fr))';
        });

        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.style.gridTemplateColumns = viewportWidth <= 600
                ? '1fr'
                : 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function () {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'inline-block' : 'none';
        });

        // Smooth scrolling to the top when the button is clicked
        scrollTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Welcome Loader and Content Transition ---
    const percentDisplay = document.getElementById('loading-percentage');
    const progressBar = document.getElementById('progress-bar');
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');
    const body = document.body;

    let percentage = 0;
    const interval = setInterval(() => {
        if (percentDisplay && progressBar) {
            percentage++;
            percentDisplay.textContent = percentage + '%';
            progressBar.style.width = percentage + '%';
        }

        if (percentage >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.style.opacity = '0';
                    setTimeout(() => {
                        if (loaderWrapper) {
                            loaderWrapper.style.display = 'none';
                        }
                        if (content) {
                            content.style.opacity = '1';
                        }
                        if (body) {
                            body.style.overflow = 'auto'; // Enable scrolling
                        }
                    }, 500); // Fade-out duration
                } else if (content && body) {
                    content.style.opacity = '1'; // If no loader, just show content
                    body.style.overflow = 'auto';
                }
            }, 1000); // Delay before fade-out
        }
    }, 25); // Adjust loading speed

    // --- Responsive Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    function updateLayoutForNavigation() {
        const viewportWidth = window.innerWidth;
        if (nav && nav.classList) {
            if (viewportWidth > 768 && nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        }
    }

    window.addEventListener('resize', updateLayoutForNavigation);
});