document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('exo-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    mobileMenu.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !mobileMenu.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
});