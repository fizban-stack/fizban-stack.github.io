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
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
            {% if post.category %}
              <span class="post-category">{{ post.category }}</span>
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

<style>
  .blog-index {
    margin-top: 2rem;
    width: 100%;
    max-width: 100%;
  }

  .blog-index h1 {
    margin-bottom: 1.5rem;
  }

  .category-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
  }

  .category-nav-link {
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    color: #00ff00;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .category-nav-link:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    transform: translateY(-2px);
  }

  .section-title {
    color: #00ff00;
    margin-bottom: 2rem;
    font-size: 1.75rem;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 100%;
  }

  .post-preview {
    padding: 1.5rem;
    border: 1px solid rgba(0, 255, 0, 0.2);
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    transition: border-color 0.3s ease, transform 0.2s ease;
  }

  .post-preview:hover {
    border-color: rgba(0, 255, 0, 0.5);
    transform: translateY(-2px);
  }

  .post-preview h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  .post-preview h3 a {
    color: #00ff00;
    text-decoration: none;
  }

  .post-preview h3 a:hover {
    text-decoration: underline;
  }

  .post-meta {
    color: #888;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .post-category {
    padding: 0.125rem 0.5rem;
    background: rgba(0, 255, 0, 0.15);
    border-radius: 0.25rem;
    font-size: 0.75rem;
    color: #00ff00;
  }

  .post-excerpt {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .read-more {
    color: #00ff00;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .read-more:hover {
    text-decoration: underline;
  }

  .no-posts {
    text-align: center;
    padding: 3rem;
    color: #888;
  }

  /* Responsive breakpoints */
  @media (max-width: 1400px) {
    .posts-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 992px) {
    .posts-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .posts-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .category-nav {
      justify-content: center;
    }
  }

  @media (max-width: 576px) {
    .post-preview {
      padding: 1rem;
    }

    .post-preview h3 {
      font-size: 1.1rem;
    }

    .category-nav-link {
      flex: 1 1 calc(50% - 0.5rem);
      text-align: center;
    }
  }

  .post-preview.hidden {
    display: none;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
    display: none;
  }

  .no-results.show {
    display: block;
  }
</style>

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
