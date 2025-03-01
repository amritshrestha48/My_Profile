
// Light/Dark mode toggle
const lightDarkToggle = document.getElementById('light-dark-toggle');

if (lightDarkToggle) {
    lightDarkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}