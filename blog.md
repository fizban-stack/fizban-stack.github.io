---
layout: default
title: Blog
description: Technical blog posts about cybersecurity, home labs, and technology
---
<article>
<p>This is my blog. Most of these posts are linked on other pages of the site, but after transferring them from my Ghost blog, I wanted to keep them in a centralized location. This allows me to add posts and link them in a similar way, but keep the entire site hosted on GitHub.</p>
</article>

<div class="blog-index">
  <h1>Blog</h1>

  {% include search-box.html id="blog-search" placeholder="Search blog posts..." %}

  {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}

  <!-- Category Navigation and Post Filter -->
  <div class="category-filters mb-4">
    <button class="filter-pill active" data-filter="recent">Recent Posts</button>
    <button class="filter-pill" data-filter="all">All Posts</button>
    {% for category_group in posts_by_category %}
      <button class="filter-pill" data-filter="category" data-category="{{ category_group.name }}">
        {{ category_group.name | default: "Uncategorized" }}
      </button>
    {% endfor %}
  </div>

  {% if site.posts.size > 0 %}
    <div class="row g-4" id="posts-grid">
      {% for post in site.posts limit:12 %}
        <div class="col-md-6 col-lg-4">
          <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
            <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
              <h5 class="card-title">
                <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
              </h5>
              <div class="post-meta" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 0.75rem;">
                <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
                {% if post.category %}
                  <span class="post-category" style="margin-left: 0.5rem; padding: 0.125rem 0.5rem; background: var(--accent-green-20); border-radius: 4px; color: var(--accent-green);">{{ post.category }}</span>
                {% endif %}
              </div>
              {% if post.excerpt %}
                <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
              {% endif %}
              <div class="mt-auto">
                <a href="{{ post.url | relative_url }}" class="btn btn-dark" style="width: 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">Read More</a>
              </div>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">No blog posts yet. Check back soon!</p>
  {% endif %}
</div>

<div id="no-posts-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No posts found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blog-search');
    const clearBtn = document.getElementById('blog-search-clear');
    const postsGrid = document.getElementById('posts-grid');
    const filterPills = document.querySelectorAll('.filter-pill');
    const noResults = document.getElementById('no-posts-results');

    // Check URL parameters for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const categoryParam = urlParams.get('category');

    let currentFilter = 'recent';
    let currentCategory = null;

    // Set initial state based on URL parameters
    if (categoryParam) {
      currentFilter = 'category';
      currentCategory = categoryParam;
      filterPills.forEach(p => p.classList.remove('active'));
      const categoryPill = document.querySelector(`[data-category="${categoryParam}"]`);
      if (categoryPill) categoryPill.classList.add('active');
    } else if (filterParam === 'all') {
      currentFilter = 'all';
      filterPills.forEach(p => p.classList.remove('active'));
      document.querySelector('[data-filter="all"]').classList.add('active');
    }

    // All posts data from Jekyll
    const allPosts = [
      {% for post in site.posts %}
      {
        title: {{ post.title | jsonify }},
        url: {{ post.url | relative_url | jsonify }},
        date: {{ post.date | date: "%B %d, %Y" | jsonify }},
        datetime: {{ post.date | date_to_xmlschema | jsonify }},
        category: {{ post.category | default: "" | jsonify }},
        excerpt: {{ post.excerpt | strip_html | truncatewords: 30 | jsonify }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ];

    function renderPosts(postsToShow) {
      // Clear existing posts
      postsGrid.innerHTML = '';

      if (postsToShow.length === 0) {
        noResults.style.display = 'block';
        return;
      }

      noResults.style.display = 'none';

      postsToShow.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';

        let categoryHtml = '';
        if (post.category) {
          categoryHtml = `<span class="post-category" style="margin-left: 0.5rem; padding: 0.125rem 0.5rem; background: var(--accent-green-20); border-radius: 4px; color: var(--accent-green);">${post.category}</span>`;
        }

        let excerptHtml = '';
        if (post.excerpt) {
          excerptHtml = `<p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">${post.excerpt}</p>`;
        }

        col.innerHTML = `
          <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
            <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
              <h5 class="card-title">
                <a href="${post.url}" style="color: var(--accent-cyan); text-decoration: none;">${post.title}</a>
              </h5>
              <div class="post-meta" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 0.75rem;">
                <time datetime="${post.datetime}">${post.date}</time>
                ${categoryHtml}
              </div>
              ${excerptHtml}
              <div class="mt-auto">
                <a href="${post.url}" class="btn btn-dark" style="width: 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">Read More</a>
              </div>
            </div>
          </div>
        `;

        postsGrid.appendChild(col);
      });
    }

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();

      // Get posts based on current filter
      let postsToFilter;
      if (currentFilter === 'recent') {
        postsToFilter = allPosts.slice(0, 12);
      } else if (currentFilter === 'category' && currentCategory) {
        postsToFilter = allPosts.filter(post => post.category === currentCategory);
      } else {
        postsToFilter = allPosts;
      }

      if (query === '') {
        renderPosts(postsToFilter);
        clearBtn.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      // Search through posts based on current filter
      const matchedPosts = postsToFilter.filter(post => {
        const title = post.title.toLowerCase();
        const excerpt = post.excerpt.toLowerCase();
        const category = post.category.toLowerCase();

        return title.includes(query) || excerpt.includes(query) || category.includes(query);
      });

      renderPosts(matchedPosts);
    }

    // Filter pill click handlers
    filterPills.forEach(pill => {
      pill.addEventListener('click', function() {
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter');
        currentCategory = this.getAttribute('data-category') || null;

        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.delete('filter');
        url.searchParams.delete('category');
        if (currentFilter === 'all') {
          url.searchParams.set('filter', 'all');
        } else if (currentFilter === 'category' && currentCategory) {
          url.searchParams.set('category', currentCategory);
        }
        window.history.replaceState({}, '', url);

        performSearch();
      });
    });

    searchInput.addEventListener('input', performSearch);

    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      performSearch();
      searchInput.focus();
    });

    // Initial render based on URL parameters
    if (filterParam || categoryParam) {
      performSearch();
    }
  });
</script>
