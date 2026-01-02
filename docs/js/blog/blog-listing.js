// Blog listing - Displays blog posts organized by categories
document.addEventListener("DOMContentLoaded", function() {
  const blogContainer = document.getElementById('blog-content');

  // Check if blog data is loaded
  if (typeof blogPosts === 'undefined' || typeof blogCategories === 'undefined') {
    console.error('Blog data is not loaded');
    blogContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error Loading Blog Data</h4>
        <p>The blog data could not be loaded. Please try refreshing the page.</p>
      </div>
    `;
    return;
  }

  // Build HTML for all categories
  let categoriesHTML = '<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">';

  // Iterate through each category
  for (const [categoryKey, categoryInfo] of Object.entries(blogCategories)) {
    const postsInCategory = getPostsByCategory(categoryKey);

    // Only display category if it has posts
    if (postsInCategory.length > 0) {
      categoriesHTML += `
        <div class="col">
          <section class="mb-4">
            <h2 class="mb-3">${categoryInfo.name}</h2>
            <div class="d-flex flex-column gap-3">
      `;

      // Add each post in this category
      postsInCategory.forEach(post => {
        categoriesHTML += `
          <div class="card shadow-sm hover-lift">
            ${post.image ? `<img src="${post.image}" class="card-img-top" alt="${post.title}" style="height: 150px; object-fit: cover;">` : ''}
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text text-muted small mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-calendar3 me-1" viewBox="0 0 16 16">
                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                ${formatDate(post.date)}
              </p>
              <p class="card-text">${post.description}</p>
              <a href="blog-post.html?id=${post.id}" class="btn btn-primary btn-sm">Read More</a>
            </div>
          </div>
        `;
      });

      categoriesHTML += `
            </div>
          </section>
        </div>
      `;
    }
  }

  categoriesHTML += '</div>';

  // If no posts found at all
  if (categoriesHTML === '') {
    categoriesHTML = `
      <div class="alert alert-info" role="alert">
        <h4 class="alert-heading">No Posts Yet</h4>
        <p>Check back soon for new content!</p>
      </div>
    `;
  }

  // Inject the content
  blogContainer.innerHTML = categoriesHTML;
});
