// Self-hosted apps page - rendering logic
function buildSelfHostedGrid() {
  const gridContainer = document.getElementById('self-hosted-grid-placeholder');
  if (!gridContainer) return;

  let cardsHTML = '';

  // Convert the selfHostedServices object to an array and iterate
  Object.values(selfHostedServices).forEach(service => {
    // Build the tags
    let tagsHTML = service.tags.map(tag =>
      `<span class="badge ${tag.color} me-1 mb-1">${tag.text}</span>`
    ).join('');

    // Build the links - prioritize the post link
    let postLink = `<a href="post.html?id=${service.id}" class="btn btn-dark">Learn More</a>`;

    let githubLink = service.links.github ?
      `<a href="${service.links.github}" target="_blank" class="btn btn-outline-secondary ms-2">GitHub</a>` : '';

    let officialLink = service.links.official && !service.links.github ?
      `<a href="${service.links.official}" target="_blank" class="btn btn-outline-secondary ms-2">Official Site</a>` : '';

    // Create the final card HTML
    cardsHTML += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card project-card h-100 d-flex flex-column">
              <img src="${service.image}" class="card-img-top" alt="${service.title}">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${service.title}</h5>
                  <p class="card-text">${service.description}</p>
                  <div class="card-tags mb-3">
                      ${tagsHTML}
                  </div>
                  <div class="mt-auto">
                      ${postLink}
                      ${githubLink}
                      ${officialLink}
                  </div>
              </div>
          </div>
      </div>
    `;
  });

  gridContainer.innerHTML = cardsHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  buildSelfHostedGrid();
});
