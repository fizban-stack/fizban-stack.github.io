// Initialize shared components on all pages
document.addEventListener("DOMContentLoaded", function() {
  // Initialize navbar and footer (defined in shared modules)
  if (typeof initNavbar === 'function') {
    initNavbar();
  }

  if (typeof initFooter === 'function') {
    initFooter();
  }
});
