/**
 * Main entry point for the application
 * Initializes all modules when DOM is ready
 *
 * Note: Module files must be loaded before this script in HTML
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize components
  if (typeof initNavbar === 'function') initNavbar();
  if (typeof initFooter === 'function') initFooter();
  if (typeof initAccordionCounter === 'function') initAccordionCounter();

  // Build dynamic content
  if (typeof buildTimeline === 'function') buildTimeline();
  if (typeof buildProjects === 'function') buildProjects();
  if (typeof buildTools === 'function') buildTools();
});
