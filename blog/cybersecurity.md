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
