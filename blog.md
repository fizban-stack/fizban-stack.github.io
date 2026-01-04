---
layout: default
title: Blog
description: Technical blog posts about cybersecurity, home labs, and technology
---

<div class="blog-index">
  <h1>Blog</h1>

  {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}

  {% if posts_by_category.size > 0 %}
    <div class="categories-grid">
      {% for category_group in posts_by_category %}
        <section class="category-column">
          <h2 class="category-title">{{ category_group.name | default: "Uncategorized" }}</h2>

          <div class="posts-list">
            {% for post in category_group.items %}
              <article class="post-preview">
                <h3>
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h3>
                <div class="post-meta">
                  <time datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%B %d, %Y" }}
                  </time>
                  {% if post.author %}
                    <span class="post-author">by {{ post.author }}</span>
                  {% endif %}
                </div>
                {% if post.excerpt %}
                  <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                {% endif %}
                <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
              </article>
            {% endfor %}
          </div>
        </section>
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
    margin-bottom: 2rem;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
  }

  .category-column {
    display: flex;
    flex-direction: column;
  }

  .category-title {
    border-bottom: 2px solid #00ff00;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    color: #00ff00;
    position: sticky;
    top: 80px;
    background: var(--bs-body-bg, #0a0e27);
    z-index: 10;
    padding-top: 0.5rem;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
  }

  .post-author {
    margin-left: 0.75rem;
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
  @media (max-width: 992px) {
    .categories-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .categories-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .category-title {
      position: static;
    }
  }

  @media (max-width: 576px) {
    .post-preview {
      padding: 1rem;
    }

    .post-preview h3 {
      font-size: 1.1rem;
    }
  }
</style>
