// Navbar generation module
function initNavbar() {
  const navbarHTML = `
    <nav class="navbar navbar-dark navbar-expand-md fixed-top">
      <a class="navbar-brand" href="index.html">
        <img src="images/icons/favicon.webp" alt="Site Logo" width="80" height="80" class="d-inline-block align-text-top me-2">
        James Wells
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="projects.html">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="cert.html">Certifications</a></li>
          <li class="nav-item"><a class="nav-link" href="timeline.html">Timeline</a></li>
          <li class="nav-item"><a class="nav-link" href="self-hosted.html">Self-Hosted</a></li>
          <li class="nav-item"><a class="nav-link" href="training.html">Free Cyber Security Training</a></li>
          <li class="nav-item"><a class="nav-link" href="podcasts.html">Recommended Podcasts</a></li>
          <li class="nav-item"><a class="nav-link" href="https://blog.wellslabs.org" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;

  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = navbarHTML;
  }
}
