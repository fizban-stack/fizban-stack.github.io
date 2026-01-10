/**
 * Blog Search Functionality
 * Handles dynamic post rendering and search for the blog index page
 */

function initBlogSearch(posts, options = {}) {
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById(options.searchInputId || 'blog-search');
    const clearBtn = document.getElementById(options.clearBtnId || 'blog-search-clear');
    const postsGrid = document.querySelector(options.gridSelector || '.posts-grid');
    const defaultLimit = options.defaultLimit || 12;

    // Create no results message
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = options.noResultsText || 'No posts found matching your search.';
    postsGrid.appendChild(noResults);

    function renderPosts(postsToShow) {
      // Clear existing posts but keep noResults
      const existingPosts = postsGrid.querySelectorAll('.post-preview');
      existingPosts.forEach(post => post.remove());

      if (postsToShow.length === 0) {
        noResults.classList.add('show');
        return;
      }

      noResults.classList.remove('show');

      postsToShow.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-preview';

        let html = `
          <h3>
            <a href="${post.url}">${post.title}</a>
          </h3>
          <div class="post-meta">
            <time datetime="${post.datetime}">
              ${post.date}
            </time>`;

        if (post.category) {
          html += `
            <span class="post-category">${post.category}</span>`;
        }

        html += `
          </div>`;

        if (post.excerpt) {
          html += `
          <p class="post-excerpt">${post.excerpt}</p>`;
        }

        html += `
          <a href="${post.url}" class="read-more">Read more →</a>`;

        article.innerHTML = html;
        postsGrid.insertBefore(article, noResults);
      });
    }

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();

      if (query === '') {
        // Show recent posts (default view)
        renderPosts(posts.slice(0, defaultLimit));
        if (clearBtn) clearBtn.style.display = 'none';
        return;
      }

      if (clearBtn) clearBtn.style.display = 'block';

      // Search through all posts
      const matchedPosts = posts.filter(post => {
        const title = post.title.toLowerCase();
        const excerpt = post.excerpt.toLowerCase();
        const category = post.category.toLowerCase();

        return title.includes(query) || excerpt.includes(query) || category.includes(query);
      });

      renderPosts(matchedPosts);
    }

    searchInput.addEventListener('input', performSearch);

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
      });
    }
  });
}
