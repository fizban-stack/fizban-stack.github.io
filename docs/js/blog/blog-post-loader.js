// Blog post loader - Dynamically loads blog post content based on URL parameter
document.addEventListener("DOMContentLoaded", function() {
  // Get the post ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const postContainer = document.getElementById('blog-post-content');

  // Check if blogPosts is loaded
  if (typeof blogPosts === 'undefined') {
    console.error('blogPosts is not loaded');
    postContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error Loading Data</h4>
        <p>The blog data could not be loaded. Please try refreshing the page.</p>
        <hr>
        <p class="mb-0"><a href="blog.html" class="alert-link">Return to Blog</a></p>
      </div>
    `;
    return;
  }

  if (!postId || !blogPosts[postId]) {
    // Post not found
    postContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Post Not Found</h4>
        <p>The requested blog post could not be found.</p>
        <hr>
        <p class="mb-0"><a href="blog.html" class="alert-link">Return to Blog</a></p>
      </div>
    `;
    return;
  }

  // Get the post data
  const post = blogPosts[postId];

  // Update page title
  document.title = `${post.title} - James Wells`;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', post.description);
  }

  // Get category info
  const categoryInfo = blogCategories[post.category] || { name: 'General' };

  // Build the complete post HTML
  const postHTML = `
    <article>
      <header class="mb-4">
        <div class="mb-3">
          <span class="badge bg-primary fs-6">
            ${categoryInfo.name}
          </span>
        </div>
        <h1 class="display-4">${post.title}</h1>
        <p class="lead text-muted">${post.description}</p>
        <p class="text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3 me-1" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          ${formatDate(post.date)}
        </p>
      </header>

      ${post.image ? `
      <div class="row mb-4">
        <div class="col-lg-10 mx-auto">
          <img src="${post.image}" class="img-fluid rounded shadow-sm mb-4" alt="${post.title}">
        </div>
      </div>
      ` : ''}

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="blog-post-body">
            ${post.fullContent}
          </div>

          <hr class="my-5">

          <div class="mt-4">
            <a href="blog.html" class="btn btn-outline-secondary">← Back to Blog</a>
          </div>
        </div>
      </div>
    </article>
  `;

  // Inject the post content
  postContainer.innerHTML = postHTML;
});
