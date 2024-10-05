document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('exo-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');

    if (mobileMenu && sidebar && sidebarClose) {
        mobileMenu.addEventListener('click', function(event) {
            event.stopPropagation();
            sidebar.classList.add('active');
        });

        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function(event) {
            if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !mobileMenu.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    } else {
        console.error('One or more required elements are missing.');
    }
});