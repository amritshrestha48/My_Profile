// Combined JavaScript Code

document.addEventListener('DOMContentLoaded', function() {

    // Loader functionality
    var loadingPercentage = document.getElementById('loading-percentage');
    var loaderWrapper = document.getElementById('loader-wrapper');
    var content = document.getElementById('content');
    var percent = 0;

    var interval = setInterval(function() {
        percent++;
        loadingPercentage.textContent = percent + '%';

        if (percent >= 100) {
            clearInterval(interval);
            loaderWrapper.style.display = 'none'; // Hide loader
            content.style.display = 'block'; // Show content
        }
    }, 20); // Adjust timing as needed


    // Light/Dark Mode Toggle
    const toggleButton = document.getElementById('light-dark-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Change the icon based on the mode
        const icon = toggleButton.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});