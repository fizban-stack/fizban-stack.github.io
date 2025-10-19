/**
 * Project Builder Module
 * Dynamically builds project cards from projectData
 */

(function() {
  'use strict';

  window.buildProjects = function() {
    const projectContainer = document.getElementById('project-grid-placeholder');
    if (!projectContainer || typeof projectData === 'undefined') {
      return;
    }

    let projectsHTML = '';
    projectData.forEach(project => {
      // Build the tags
      let tagsHTML = project.tags.map(tag =>
        `<span class="badge ${tag.color} me-1 mb-1">${tag.text}</span>`
      ).join('');

      // Build the links (only if they exist)
      let blogLink = project.links.blog ?
        `<a href="${project.links.blog}" target="_blank" class="btn btn-dark">Read Blog Post</a>` : '';
      let githubLink = project.links.github ?
        `<a href="${project.links.github}" target="_blank" class="btn btn-outline-secondary ms-2">View on GitHub</a>` : '';

      // Create the final card HTML
      projectsHTML += `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card project-card h-100 d-flex flex-column">
            <img src="${project.image}" class="card-img-top" alt="${project.alt}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <div class="card-tags mb-3">
                ${tagsHTML}
              </div>
              <div class="mt-auto">
                ${blogLink}
                ${githubLink}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    projectContainer.innerHTML = projectsHTML;
  };
})();
