document.addEventListener("DOMContentLoaded", function() {
  
  // NAVBAR
  const navbarHTML = `
    <nav class="navbar navbar-expand-md fixed-top">
      <a class="navbar-brand" href="index.html">
        <img src="images/icons/favicon.webp" alt="Site Logo" width="60" height="60" class="d-inline-block align-text-top me-2">
        James Wells
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="grid.html">Grid</a></li>
          <li class="nav-item"><a class="nav-link" href="carousel.html">Self-Hosted</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="cert.html">Certifications</a></li>
          <li class="nav-item"><a class="nav-link" href="timeline.html">Learning Timeline</a></li>
        </ul>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link" href="https://www.blog.wellslabs.org" target="_blank" rel="noopener noreferrer">My Blog</a>
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
        <div class="d-flex justify-content-end align-items-center">
            <div>
                <a href="https://www.blog.wellslabs.org" target="_blank" rel="noopener noreferrer" class="footer-link">My Blog</a>
            </div>
            <a href="mailto:james@wellslabs.org" class="footer-icon-box" aria-label="Email James Wells">
                <img src="images/icons/zoho-mail.svg" alt="Email" width="24" height="24">
            </a>
            <a href="https://www.linkedin.com/in/james-wells-122170164/" target="_blank" rel="noopener noreferrer" class="footer-icon-box" aria-label="View James Wells on LinkedIn">
                <img src="images/icons/linkedin.svg" alt="LinkedIn" width="24" height="24">
            </a>
            <a href="https://twitter.com/fizbanstack" target="_blank" rel="noopener noreferrer" class="footer-icon-box" aria-label="View James Wells on X">
                <img src="images/icons/x.svg" alt="X" width="24" height="24">
            </a>
            <a href="https://discord.com/users/fizbanstack" target="_blank" rel="noopener noreferrer" class="footer-icon-box" aria-label="Contact James Wells on Discord">
                <img src="images/icons/discord.svg" alt="Discord" width="24" height="24">
            </a>
            <a href="#" class="footer-icon-box" aria-label="View James Wells on GitHub">
                <img src="images/icons/github-dark.svg" alt="GitHub" width="24" height="24">
            </a>
        </div>
      </div>
    </footer>
  `;
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }
  
  // SET ACTIVE NAV LINK
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
  }
  
  // DYNAMIC ACCORDION COUNT
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const certLinksCount = item.querySelectorAll('.list-group-item').length;
    const countSpan = item.querySelector('.cert-count');
    if (countSpan && certLinksCount > 0) {
      countSpan.textContent = certLinksCount;
    }
  });

  // DYNAMIC TIMELINE BUILDER
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

  buildTimeline();
  setActiveNavLink();

});
