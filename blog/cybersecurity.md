---
layout: default
title: Cybersecurity - Blog
description: Blog posts about cybersecurity, ethical hacking, and security tools
permalink: /blog/cybersecurity/
---

<div class="blog-category">
  <h1>Cybersecurity</h1>

  <!-- Category Navigation -->
  <nav class="category-nav">
    <a href="/blog/" class="category-nav-link">All Posts</a>
    {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}
    {% for category_group in posts_by_category %}
      {% if category_group.name != "Cybersecurity" %}
        <a href="/blog/{{ category_group.name | default: 'uncategorized' | slugify }}/" class="category-nav-link">
          {{ category_group.name | default: "Uncategorized" }}
        </a>
      {% endif %}
    {% endfor %}
  </nav>

  {% assign category_posts = site.posts | where: "category", "Cybersecurity" %}

  {% if category_posts.size > 0 %}
    <div class="posts-grid">
      {% for post in category_posts %}
        <article class="post-preview">
          <h3>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
          </div>
          {% if post.excerpt %}
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
          {% endif %}
          <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p class="no-posts">No cybersecurity posts yet. Check back soon!</p>
  {% endif %}
</div>

<style>
  .blog-category {
    margin-top: 2rem;
    width: 100%;
    max-width: 100%;
  }

  .blog-category h1 {
    margin-bottom: 1.5rem;
    color: #00ff00;
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
</style>
