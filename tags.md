---
layout: default
title: Tags
description: Browse blog posts by tag
---

# Tags

<div class="blog-index">
  {% assign all_tags = "" | split: "" %}
  {% for post in site.posts %}
    {% if post.tags %}
      {% for tag in post.tags %}
        {% assign all_tags = all_tags | push: tag %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  {% assign unique_tags = all_tags | uniq | sort %}

  {% if unique_tags.size > 0 %}
    <div class="category-filters mb-4">
      {% for tag in unique_tags %}
        <a href="#tag-{{ tag | slugify }}" class="filter-pill">{{ tag }}</a>
      {% endfor %}
    </div>

    {% for tag in unique_tags %}
      <div id="tag-{{ tag | slugify }}" class="tag-group">
        <h2 class="section-title">{{ tag }}</h2>
        <div class="row g-3">
          {% for post in site.posts %}
            {% if post.tags contains tag %}
              <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
                    </h5>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                      {{ post.date | date: "%B %d, %Y" }}
                    </div>
                  </div>
                </div>
              </div>
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  {% else %}
    <p class="no-posts">No tags found yet. Add <code>tags: [tag1, tag2]</code> to post frontmatter.</p>
  {% endif %}
</div>
