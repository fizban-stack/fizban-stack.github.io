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

<script src="{{ '/assets/js/blog-search.js' | relative_url }}"></script>
<script>
  // Initialize blog search with post data from Jekyll
  initBlogSearch([
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
  ]);
</script>
