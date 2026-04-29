---
layout: default
title: Blog
description: Technical blog posts about cybersecurity, home labs, and technology
---
<article>
<p>This is my blog. Most of these posts are linked on other pages of the site, but after transferring them from my Ghost blog, I wanted to keep them in a centralized location. This allows me to add posts and link them in a similar way, but keep the entire site hosted on GitHub.</p>
</article>

<section class="series-hub">
  <h2 class="series-hub-title">10 Days of Series</h2>
  <p class="series-hub-note">The posts in these series were created by AI for use as personal training and study material.</p>

  <div class="row g-4">

    <div class="col-md-4">
      <div class="series-card h-100 d-flex flex-column">
        <div class="series-card-accent" style="background: var(--accent-cyan);"></div>
        <div class="series-card-body d-flex flex-column">
          <h3 class="series-card-title">10 Days of Active Directory Security</h3>
          <p class="series-card-desc">Ten essential offensive tools — BloodHound, Impacket, Rubeus, Mimikatz, and more — for AD penetration testing and security assessment.</p>
          <div class="mt-auto">
            <a href="{% post_url 2026-02-05-10-days-ad-security-series %}" class="btn btn-dark series-btn">View Series →</a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="series-card h-100 d-flex flex-column">
        <div class="series-card-accent" style="background: var(--accent-green);"></div>
        <div class="series-card-body d-flex flex-column">
          <h3 class="series-card-title">10 Days of Python Security</h3>
          <p class="series-card-desc">Production-ready Python tools covering SIEM automation, threat intelligence, container scanning, API security testing, and memory forensics.</p>
          <div class="mt-auto">
            <a href="{% post_url 2026-02-15-10-days-python-security-series %}" class="btn btn-dark series-btn">View Series →</a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="series-card h-100 d-flex flex-column">
        <div class="series-card-accent" style="background: #c678dd;"></div>
        <div class="series-card-body d-flex flex-column">
          <h3 class="series-card-title">10 Days of PowerShell Security</h3>
          <p class="series-card-desc">Windows-focused automation spanning Active Directory hardening, CIS compliance, Azure Defender, M365 auditing, and incident response.</p>
          <div class="mt-auto">
            <a href="{% post_url 2026-02-26-10-days-powershell-security-series %}" class="btn btn-dark series-btn">View Series →</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<style>
.series-hub {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 217, 255, 0.15);
  border-radius: 10px;
}
.series-hub-title {
  font-family: var(--font-mono);
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
}
.series-hub-note {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
}
.series-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 217, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.series-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 217, 255, 0.5);
}
.series-card-accent {
  height: 4px;
}
.series-card-body {
  padding: 1.5rem;
  flex: 1;
}
.series-card-title {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}
.series-card-desc {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.25rem;
}
.series-btn {
  width: 100%;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.875rem;
}
</style>

<div class="blog-index">
  <h1>Blog</h1>

  {% include search-box.html id="blog-search" placeholder="Search blog posts..." %}

  {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}

  <!-- Category Navigation and Post Filter -->
  <div class="category-filters mb-4">
    <button class="filter-pill active" data-filter="all">All Posts</button>
    <button class="filter-pill" data-filter="recent">Recent Posts</button>
    {% for category_group in posts_by_category %}
      <button class="filter-pill" data-filter="category" data-category="{{ category_group.name }}">
        {{ category_group.name | default: "Uncategorized" }}
      </button>
    {% endfor %}
  </div>

  {% if site.posts.size > 0 %}
    <div class="row g-4" id="posts-grid">
      {% for post in site.posts %}
        <div class="col-md-6 col-lg-4">
          <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
            <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
              <h5 class="card-title">
                <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
              </h5>
              <div class="post-meta" style="font-size: 0.8rem; margin-bottom: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                {% if post.category %}
                  <span class="post-category" style="padding: 0.125rem 0.5rem; background: var(--accent-green-20); border-radius: 4px; color: var(--accent-green);">{{ post.category }}</span>
                {% endif %}
                <time datetime="{{ post.date | date_to_xmlschema }}" style="padding: 0.125rem 0.5rem; background: var(--bg-tertiary); border-radius: 4px; color: var(--text-secondary);">{{ post.date | date: "%B %d, %Y" }}</time>
                <span style="padding: 0.125rem 0.5rem; color: var(--text-muted);">{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
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

    let currentFilter = 'all';
    let currentCategory = null;

    // Set initial state based on URL parameters
    if (categoryParam) {
      currentFilter = 'category';
      currentCategory = categoryParam;
      filterPills.forEach(p => p.classList.remove('active'));
      const categoryPill = document.querySelector(`[data-category="${categoryParam}"]`);
      if (categoryPill) categoryPill.classList.add('active');
    } else if (filterParam === 'recent') {
      currentFilter = 'recent';
      filterPills.forEach(p => p.classList.remove('active'));
      document.querySelector('[data-filter="recent"]').classList.add('active');
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
        excerpt: {{ post.excerpt | strip_html | truncatewords: 30 | jsonify }},
        readTime: {{ post.content | number_of_words | divided_by: 200 | plus: 1 }}
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
          categoryHtml = `<span class="post-category" style="padding: 0.125rem 0.5rem; background: var(--accent-green-20); border-radius: 4px; color: var(--accent-green);">${post.category}</span>`;
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
              <div class="post-meta" style="font-size: 0.8rem; margin-bottom: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${categoryHtml}
                <time datetime="${post.datetime}" style="padding: 0.125rem 0.5rem; background: var(--bg-tertiary); border-radius: 4px; color: var(--text-secondary);">${post.date}</time>
                <span style="padding: 0.125rem 0.5rem; color: var(--text-muted);">${post.readTime} min read</span>
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
