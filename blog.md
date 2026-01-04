---
layout: default
title: Blog
description: Technical blog posts about cybersecurity, home labs, and technology
---

<div class="blog-index">
  <h1>Blog</h1>

  {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}

  {% if posts_by_category.size > 0 %}
    {% for category_group in posts_by_category %}
      <section class="category-section">
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
                <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
              {% endif %}
              <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
            </article>
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  {% else %}
    <p class="no-posts">No blog posts yet. Check back soon!</p>
  {% endif %}
</div>

<style>
  .blog-index {
    margin-top: 2rem;
  }

  .category-section {
    margin-bottom: 3rem;
  }

  .category-title {
    border-bottom: 2px solid #00ff00;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    color: #00ff00;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .post-preview {
    padding: 1.5rem;
    border: 1px solid rgba(0, 255, 0, 0.2);
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    transition: border-color 0.3s ease;
  }

  .post-preview:hover {
    border-color: rgba(0, 255, 0, 0.5);
  }

  .post-preview h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
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
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .post-author {
    margin-left: 1rem;
  }

  .post-excerpt {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .read-more {
    color: #00ff00;
    text-decoration: none;
    font-weight: 500;
  }

  .read-more:hover {
    text-decoration: underline;
  }

  .no-posts {
    text-align: center;
    padding: 3rem;
    color: #888;
  }
</style>
