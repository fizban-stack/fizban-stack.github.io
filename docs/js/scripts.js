/**
 * Main entry point for the application
 * Imports and initializes all modules
 */

import { initNavbar } from './modules/navbar.js';
import { initFooter } from './modules/footer.js';
import { initAccordionCounter } from './modules/accordion-counter.js';
import { buildTimeline } from './modules/timeline-builder.js';
import { buildProjects } from './modules/project-builder.js';
import { buildTools } from './modules/tool-builder.js';

document.addEventListener("DOMContentLoaded", function() {
  // Initialize components
  initNavbar();
  initFooter();
  initAccordionCounter();

  // Build dynamic content
  buildTimeline();
  buildProjects();
  buildTools();
});
