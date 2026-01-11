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
    <div class="posts-grid">
      {% for post in site.posts limit:12 %}
        <article class="post-preview">
          <h3>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          <div class="content-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
            {% if post.category %}
              <span class="content-category">{{ post.category }}</span>
            {% endif %}
          </div>
          {% if post.excerpt %}
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
          {% endif %}
          <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">No blog posts yet. Check back soon!</p>
  {% endif %}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blog-search');
    const clearBtn = document.getElementById('blog-search-clear');
    const postsGrid = document.querySelector('.posts-grid');
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No posts found matching your search.';
    postsGrid.appendChild(noResults);

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
          <div class="content-meta">
            <time datetime="${post.datetime}">
              ${post.date}
            </time>`;

        if (post.category) {
          html += `
            <span class="content-category">${post.category}</span>`;
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
        // Show recent 12 posts (default view)
        renderPosts(allPosts.slice(0, 12));
        clearBtn.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      // Search through all posts
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
