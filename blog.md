---
layout: default
title: Blog
description: Technical blog posts about cybersecurity, home labs, and technology
---

<div class="blog-index">
  <h1>Blog</h1>

  {% include search-box.html id="blog-search" placeholder="Search blog posts..." %}

  {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}

  <!-- Category Navigation -->
  <nav class="category-nav">
    {% for category_group in posts_by_category %}
      <a href="/blog/{{ category_group.name | default: 'uncategorized' | slugify }}/" class="category-nav-link">
        {{ category_group.name | default: "Uncategorized" }}
      </a>
    {% endfor %}
  </nav>

  <!-- Recent Posts -->
  <h2 class="section-title">Recent Posts</h2>

  {% if site.posts.size > 0 %}
    <div class="row g-4" id="posts-grid">
      {% for post in site.posts limit:12 %}
        <div class="col-md-6 col-lg-4">
          <article class="card project-card h-100 d-flex flex-column">
            {% if post.image %}
            <img src="{{ '/assets/images/' | append: post.image | relative_url }}" class="card-img-top" alt="{{ post.title }}" loading="lazy">
            {% else %}
            <div class="card-img-top card-img-placeholder"></div>
            {% endif %}
            <div class="card-body d-flex flex-column">
              <h3 class="card-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
              <div class="post-meta mb-3">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                  {{ post.date | date: "%B %d, %Y" }}
                </time>
                {% if post.category %}
                  <span class="post-category">{{ post.category }}</span>
                {% endif %}
              </div>
              {% if post.excerpt %}
                <p class="card-text flex-grow-1">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
              {% endif %}
              <a href="{{ post.url | relative_url }}" class="read-more mt-auto">Read more →</a>
            </div>
          </article>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">No blog posts yet. Check back soon!</p>
  {% endif %}
</div>

<div id="no-blog-results" class="no-results">
  <p class="fs-5 mb-2">No posts found</p>
  <p class="small">Try adjusting your search criteria</p>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blog-search');
    const clearBtn = document.getElementById('blog-search-clear');
    const postsGrid = document.getElementById('posts-grid');
    const noResults = document.getElementById('no-blog-results');

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
        image: {{ post.image | default: "" | jsonify }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ];

    function renderPosts(postsToShow) {
      // Clear existing posts
      const existingPosts = postsGrid.querySelectorAll('.col-md-6');
      existingPosts.forEach(post => post.remove());

      if (postsToShow.length === 0) {
        noResults.classList.add('show');
        return;
      }

      noResults.classList.remove('show');

      postsToShow.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';

        let imageHtml = '';
        if (post.image) {
          imageHtml = `<img src="/assets/images/${post.image}" class="card-img-top" alt="${post.title}" loading="lazy">`;
        } else {
          imageHtml = `<div class="card-img-top card-img-placeholder"></div>`;
        }

        let categoryHtml = '';
        if (post.category) {
          categoryHtml = `<span class="post-category">${post.category}</span>`;
        }

        let excerptHtml = '';
        if (post.excerpt) {
          excerptHtml = `<p class="card-text flex-grow-1">${post.excerpt}</p>`;
        }

        col.innerHTML = `
          <article class="card project-card h-100 d-flex flex-column">
            ${imageHtml}
            <div class="card-body d-flex flex-column">
              <h3 class="card-title">
                <a href="${post.url}">${post.title}</a>
              </h3>
              <div class="post-meta mb-3">
                <time datetime="${post.datetime}">${post.date}</time>
                ${categoryHtml}
              </div>
              ${excerptHtml}
              <a href="${post.url}" class="read-more mt-auto">Read more →</a>
            </div>
          </article>`;

        postsGrid.appendChild(col);
      });
    }

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();

      if (query === '') {
        renderPosts(allPosts.slice(0, 12));
        clearBtn.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      const matchedPosts = allPosts.filter(post => {
        const title = post.title.toLowerCase();
        const excerpt = post.excerpt.toLowerCase();
        const category = post.category.toLowerCase();
        return title.includes(query) || excerpt.includes(query) || category.includes(query);
      });

      renderPosts(matchedPosts);
    }

    searchInput.addEventListener('input', performSearch);

    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      performSearch();
      searchInput.focus();
    });
  });
</script>
