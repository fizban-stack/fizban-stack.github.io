---
layout: default
title: Personal Growth - Blog
description: Blog posts about career development, certifications, and personal journey
permalink: /blog/personal-growth/
---

<div class="blog-category">
  <h1>Personal Growth</h1>

  <!-- Category Navigation -->
  <nav class="category-nav">
    <a href="/blog/" class="category-nav-link">All Posts</a>
    {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}
    {% for category_group in posts_by_category %}
      {% if category_group.name != "Personal Growth" %}
        <a href="/blog/{{ category_group.name | default: 'uncategorized' | slugify }}/" class="category-nav-link">
          {{ category_group.name | default: "Uncategorized" }}
        </a>
      {% endif %}
    {% endfor %}
  </nav>

  {% assign category_posts = site.posts | where: "category", "Personal Growth" %}

  {% if category_posts.size > 0 %}
    <div class="row g-4">
      {% for post in category_posts %}
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
    <p class="no-posts">No personal growth posts yet. Check back soon!</p>
  {% endif %}
</div>
