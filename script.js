// script.js

document.addEventListener('DOMContentLoaded', function() {
    function updateLayout() {
        const viewportWidth = window.innerWidth;
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle'); // You'll need to add this element in your HTML

        // Example for smaller screens: make the navigation vertical
        if (viewportWidth <= 768) {
            nav.style.flexDirection = 'column';
            nav.style.alignItems = 'flex-start';
            const navItems = nav.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.marginLeft = '0';
                item.style.marginBottom = '10px';
            });

            // If you have a toggle button, you can add functionality here
            if (navToggle) {
                nav.style.display = 'none'; // Initially hide the nav
                navToggle.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
                });
            }
        } else {
            // Reset styles for larger screens
            nav.style.flexDirection = 'row';
            nav.style.alignItems = 'center';
            const navItems = nav.querySelectorAll('li');
            navItems.forEach((item, index) => {
                item.style.marginLeft = index > 0 ? '20px' : '0';
                item.style.marginBottom = '0';
            });
            if (navToggle) {
                nav.style.display = 'flex'; // Show nav on larger screens
            }
        }

        // Example for adjusting image sizes or layouts
        const homeSection = document.querySelector('.home-section');
        const aboutMeSection = document.querySelector('.about-me-section');
        const skillsGrid = document.querySelector('.skills-grid');
        const educationGrid = document.querySelectorAll('.education-grid');
        const projectsGrid = document.querySelector('.projects-grid');

        if (homeSection) {
            const homeContent = homeSection.nextElementSibling;
            const imageContainer = homeContent.querySelector('div:last-child');
            if (viewportWidth <= 600 && imageContainer) {
                imageContainer.style.marginTop = '20px';
                imageContainer.style.paddingLeft = '0';
            } else if (imageContainer) {
                imageContainer.style.marginTop = '0';
                imageContainer.style.paddingLeft = '20px';
            }
        }

        if (aboutMeSection) {
            aboutMeSection.style.flexDirection = viewportWidth <= 768 ? 'column' : 'row';
            const imageDiv = aboutMeSection.querySelector('.about-me-image');
            const textDiv = aboutMeSection.querySelector('.about-me-text');
            if (viewportWidth <= 768) {
                imageDiv.style.marginRight = '0';
                imageDiv.style.marginBottom = '20px';
                textDiv.style.textAlign = 'left';
            } else {
                imageDiv.style.marginRight = '40px';
                imageDiv.style.marginBottom = '0';
                textDiv.style.textAlign = 'left';
            }
        }

        if (skillsGrid) {
            skillsGrid.style.gridTemplateColumns = viewportWidth <= 600 ? 'repeat(auto-fit, minmax(80px, 1fr))' : 'repeat(auto-fit, minmax(100px, 1fr))';
        }

        educationGrid.forEach(grid => {
            grid.style.gridTemplateColumns = viewportWidth <= 600 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))';
        });

        if (projectsGrid) {
            projectsGrid.style.gridTemplateColumns = viewportWidth <= 600 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    }

    // Run on initial load
    updateLayout();

    // Run on window resize
    window.addEventListener('resize', updateLayout);
});
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