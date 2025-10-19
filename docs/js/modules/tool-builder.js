/**
 * Tool Builder Module
 * Dynamically builds tool cards from toolData, organized by category
 */

(function() {
  'use strict';

  window.buildTools = function() {
    const toolsContainer = document.getElementById('tools-container');
    if (!toolsContainer || typeof toolData === 'undefined') {
      return;
    }

    // Group tools by category
    const categorizedTools = {};
    toolData.forEach(tool => {
      if (!categorizedTools[tool.category]) {
        categorizedTools[tool.category] = [];
      }
      categorizedTools[tool.category].push(tool);
    });

    let toolsHTML = '';

    // Build each category section
    Object.keys(categorizedTools).forEach(category => {
      toolsHTML += `
        <div class="tool-category-section mb-5" data-aos="fade-up">
          <h2 class="category-title mb-4">${category}</h2>
          <div class="row g-4">
      `;

      categorizedTools[category].forEach(tool => {
        // Build tags
        let tagsHTML = tool.tags.map(tag =>
          `<span class="badge ${tag.color} me-1 mb-1">${tag.text}</span>`
        ).join('');

        // Create tool card with horizontal layout
        toolsHTML += `
          <div class="col-12" data-aos="fade-up">
            <div class="card tool-card h-100">
              <div class="row g-0">
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title mb-2">${tool.title}</h5>
                    <p class="card-text">${tool.description}</p>
                    <div class="tool-tags mb-3">
                      ${tagsHTML}
                    </div>
                  </div>
                </div>
                <div class="col-md-4 d-flex align-items-center justify-content-center tool-card-actions">
                  <div class="p-3 text-center">
                    <div class="text-muted small mb-2">Last updated: ${tool.lastUpdated}</div>
                    <a href="${tool.blogLink}" target="_blank" class="btn btn-dark btn-sm">Read Walkthrough</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      toolsHTML += `
          </div>
        </div>
      `;
    });

    toolsContainer.innerHTML = toolsHTML;
  };
})();
