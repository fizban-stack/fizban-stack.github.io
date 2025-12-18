// Blog listing page - loads posts from JSON and renders them

let blogPosts = [];

// Load blog posts from JSON
async function loadBlogPosts() {
  try {
    const response = await fetch('data/blog-posts.json');
    blogPosts = await response.json();
    buildBlogList();
  } catch (error) {
    console.error('Error loading blog posts:', error);
    const container = document.getElementById('blog-list-placeholder');
    if (container) {
      container.innerHTML = '<div class="col-12"><p class="text-center text-danger">Error loading blog posts. Please try again later.</p></div>';
    }
  }
}

// Build blog post list
function buildBlogList() {
  const container = document.getElementById('blog-list-placeholder');
  if (!container) return;

  if (blogPosts.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-center">No blog posts available yet.</p></div>';
    return;
  }

  let postsHTML = '';

  blogPosts.forEach((post, index) => {
    // Build tags
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
      tagsHTML = post.tags.map(tag =>
        `<span class="badge bg-secondary me-1">${tag}</span>`
      ).join('');
    }

    // Create post card
    postsHTML += `
      <div class="col-12 mb-4" data-aos="fade-up" data-aos-delay="${index * 50}">
        <article class="card blog-post-card h-100">
          <div class="card-body">
            <h2 class="card-title h4">
              <a href="blog-post.html?slug=${post.slug}" class="text-decoration-none text-dark">
                ${post.title}
              </a>
            </h2>
            <div class="text-muted mb-3">
              <small>${post.published_date}</small>
              ${post.tags && post.tags.length > 0 ? `<span class="ms-2">${tagsHTML}</span>` : ''}
            </div>
            <p class="card-text">${post.excerpt}</p>
            <a href="blog-post.html?slug=${post.slug}" class="btn btn-primary">Read More →</a>
          </div>
        </article>
      </div>
    `;
  });

  container.innerHTML = postsHTML;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  loadBlogPosts();
});
