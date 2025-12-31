// Post loader - Dynamically loads post content based on URL parameter
document.addEventListener("DOMContentLoaded", function() {
  // Get the post ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const postContainer = document.getElementById('post-content');

  // Check if selfHostedServices is loaded
  if (typeof selfHostedServices === 'undefined') {
    console.error('selfHostedServices is not loaded');
    postContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error Loading Data</h4>
        <p>The service data could not be loaded. Please try refreshing the page.</p>
        <hr>
        <p class="mb-0"><a href="self-hosted.html" class="alert-link">Return to Self-Hosted Apps</a></p>
      </div>
    `;
    return;
  }

  if (!postId || !selfHostedServices[postId]) {
    // Post not found
    postContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Post Not Found</h4>
        <p>The requested post could not be found.</p>
        <hr>
        <p class="mb-0"><a href="self-hosted.html" class="alert-link">Return to Self-Hosted Apps</a></p>
      </div>
    `;
    return;
  }

  // Get the post data
  const post = selfHostedServices[postId];

  // Update page title
  document.title = `${post.title} - James Wells`;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', post.description);
  }

  // Build links HTML
  let linksHTML = '';
  if (post.links.official) {
    linksHTML += `<a href="${post.links.official}" target="_blank" class="btn btn-primary me-2 mb-2">Official Website</a>`;
  }
  if (post.links.github) {
    linksHTML += `<a href="${post.links.github}" target="_blank" class="btn btn-outline-dark me-2 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github me-1" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      View on GitHub
    </a>`;
  }
  if (post.links.blog) {
    linksHTML += `<a href="${post.links.blog}" target="_blank" class="btn btn-outline-primary me-2 mb-2">Read Blog Post</a>`;
  }

  // Build the complete post HTML
  const postHTML = `
    <article>
      <header class="mb-4">
        <h1 class="display-4">${post.title}</h1>
        <p class="lead text-muted">${post.subtitle}</p>
      </header>

      <div class="row mb-4">
        <div class="col-lg-8 mx-auto">
          <img src="${post.image}" class="img-fluid rounded shadow-sm mb-4" alt="${post.title} screenshot">
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="post-body">
            ${post.fullDescription}
          </div>

          <hr class="my-4">

          <div class="d-flex flex-wrap gap-2 mb-4">
            ${linksHTML}
          </div>

          <div class="mt-4">
            <a href="self-hosted.html" class="btn btn-outline-secondary">← Back to Self-Hosted Apps</a>
          </div>
        </div>
      </div>
    </article>
  `;

  // Inject the post content
  postContainer.innerHTML = postHTML;
});
