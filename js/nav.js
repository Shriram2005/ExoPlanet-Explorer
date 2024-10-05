document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById(menuToggle.getAttribute('data-target'));

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
});