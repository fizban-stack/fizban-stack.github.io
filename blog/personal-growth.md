---
layout: default
title: Personal Growth - Blog
description: Blog posts about career development, certifications, and personal journey
permalink: /blog/personal-growth/
---

<div class="blog-category">
  <h1>Personal Growth</h1>

  <!-- Category Navigation -->
  <div class="category-filters mb-4">
    <a href="/blog/" class="filter-pill">All Posts</a>
    {% assign posts_by_category = site.posts | group_by: "category" | sort: "name" %}
    {% for category_group in posts_by_category %}
      {% if category_group.name == "Personal Growth" %}
        <span class="filter-pill active">{{ category_group.name }}</span>
      {% else %}
        <a href="/blog/{{ category_group.name | default: 'uncategorized' | slugify }}/" class="filter-pill">
          {{ category_group.name | default: "Uncategorized" }}
        </a>
      {% endif %}
    {% endfor %}
  </div>

  {% assign category_posts = site.posts | where: "category", "Personal Growth" %}

  {% if category_posts.size > 0 %}
    <div class="row g-4">
      {% for post in category_posts %}
        <div class="col-md-6 col-lg-4">
          <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
            <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
              <h5 class="card-title">
                <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
              </h5>
              <div class="post-meta" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 0.75rem;">
                <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
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
    <p class="no-posts">No personal growth posts yet. Check back soon!</p>
  {% endif %}
</div>
