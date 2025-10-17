document.addEventListener("DOMContentLoaded", function() {
  
  // NAVBAR
  const navbarHTML = `
    <nav class="navbar navbar-dark navbar-expand-md fixed-top">
      <a class="navbar-brand" href="index.html">
        <img src="images/favicon.webp" alt="Site Logo" width="60" height="60" class="d-inline-block align-text-top me-2">
        James Wells
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="projects.html">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="grid.html">Grid</a></li>
          <li class="nav-item"><a class="nav-link" href="carousel.html">Self-Hosted</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="cert.html">Certifications</a></li>
          <li class="nav-item"><a class="nav-link" href="timeline.html">Timeline</a></li>
        </ul>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link" href="https://www.blog.wellslabs.org" target="_blank" rel="noopener noreferrer">Blog</a>
            </li>
        </ul>
      </div>
    </nav>
  `;
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = navbarHTML;
  }

  // FOOTER
  const footerHTML = `
    <footer class="footer mt-auto py-3">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <a href="https://www.blog.wellslabs.org" target="_blank" rel="noopener noreferrer" class="footer-link">My Blog</a>
            </div>
            <div>
                <a href="mailto:james@wellslabs.org" class="footer-icon-box" title="Email"><img src="images/icons/zoho-mail.svg" alt="Email" width="24" height="24"></a>
                <a href="https://www.linkedin.com/in/james-wells-122170164/" target="_blank" rel="noopener noreferrer" class="footer-icon-box" title="LinkedIn"><img src="images/icons/linkedin.svg" alt="LinkedIn" width="24" height="24"></a>
                <a href="https://twitter.com/fizbanstack" target="_blank" rel="noopener noreferrer" class="footer-icon-box" title="X"><img src="images/icons/x.svg" alt="X" width="24" height="24"></a>
                <a href="#" class="footer-icon-box" title="Discord: fizban_stack"><img src="images/icons/discord.svg" alt="Discord" width="24" height="24"></a>
                <a href="#" class="footer-icon-box" title="GitHub"><img src="images/icons/github.svg" alt="GitHub" width="24" height="24"></a>
            </div>
        </div>
      </div>
    </footer>
  `;
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }

  // ACCORDION COUNT
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const certLinksCount = item.querySelectorAll('.list-group-item').length;
    const countSpan = item.querySelector('.cert-count');
    if (countSpan && certLinksCount > 0) {
      countSpan.textContent = certLinksCount;
    }
  });

  // TIMELINE BUILDER
  function buildTimeline() {
    const timelineContainer = document.getElementById('my-timeline');
    if (timelineContainer && typeof timelineEvents !== 'undefined') {
        let timelineHTML = '';
        timelineEvents.forEach(event => {
            timelineHTML += `
                <div class="timeline-item" data-aos="fade-up">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${event.date}</div>
                    <div class="timeline-content">
                        <h3><a href="${event.link}" target="_blank">${event.title}</a></h3>
                        <p>${event.description}</p>
                    </div>
                </div>
            `;
        });
        timelineContainer.innerHTML = timelineHTML;
    }
  }

  // PROJECT BUILDER
  function buildProjects() {
    const projectContainer = document.getElementById('project-grid-placeholder');
    if (!projectContainer || typeof projectData === 'undefined') return;

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
  }

  // Call builder functions
  buildTimeline();
  buildProjects();
});
