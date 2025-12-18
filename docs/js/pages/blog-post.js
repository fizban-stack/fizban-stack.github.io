// Individual blog post page - loads and displays a single post

let blogPosts = [];

// Get slug from URL parameter
function getPostSlug() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('slug');
}

// Load blog posts from JSON
async function loadBlogPosts() {
  try {
    const response = await fetch('data/blog-posts.json');
    blogPosts = await response.json();
    displayPost();
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const container = document.getElementById('blog-post-content');
    if (container) {
      container.innerHTML = '<div class="alert alert-danger">Error loading blog post. Please try again later.</div>';
    }
  }
}

// Display the blog post
function displayPost() {
  const slug = getPostSlug();
  const container = document.getElementById('blog-post-content');
  const titleElement = document.getElementById('page-title');

  if (!container) return;

  // Find the post by slug
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    container.innerHTML = `
      <div class="alert alert-warning">
        <h2>Post Not Found</h2>
        <p>The blog post you're looking for could not be found.</p>
        <a href="blog.html" class="btn btn-primary">View All Posts</a>
      </div>
    `;
    return;
  }

  // Update page title
  if (titleElement) {
    titleElement.textContent = `${post.title} - James Wells`;
  }

  // Build tags
  let tagsHTML = '';
  if (post.tags && post.tags.length > 0) {
    tagsHTML = `
      <div class="mb-3">
        ${post.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
      </div>
    `;
  }

  // Build featured image
  let featuredImageHTML = '';
  if (post.feature_image) {
    featuredImageHTML = `
      <img src="${post.feature_image}" alt="${post.title}" class="img-fluid mb-4 rounded">
    `;
  }

  // Render the post
  container.innerHTML = `
    <header class="mb-4">
      <h1>${post.title}</h1>
      <div class="text-muted mb-3">
        <time datetime="${post.published_at}">${post.published_date}</time>
      </div>
      ${tagsHTML}
    </header>
    ${featuredImageHTML}
    <div class="blog-post-content">
      ${post.html}
    </div>
  `;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  loadBlogPosts();
});
