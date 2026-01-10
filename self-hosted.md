---
layout: default
title: Self-Hosted Applications
description: Self-hosted applications and services used by James Wells in his homelab.
---

# Self-Hosted Applications

{% include search-box.html id="selfhosted-search" placeholder="Search self-hosted apps..." %}

This page showcases some of my favorite self-hosted applications that I use in my homelab. These tools help me manage infrastructure, learn new technologies, and maintain my homelab environment.

<article>
  <h4>Why Self-Host?</h4>
  <p>Self-hosting gives you complete control over your data, helps you learn system administration, and provides hands-on experience with technologies used in enterprise environments. It has been an essential part of my cybersecurity learning journey.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters">
  <button class="filter-pill active" data-category="all">All Apps</button>
  <button class="filter-pill" data-category="Infrastructure">Infrastructure</button>
  <button class="filter-pill" data-category="Security">Security</button>
  <button class="filter-pill" data-category="Media">Media</button>
  <button class="filter-pill" data-category="Productivity">Productivity</button>
  <button class="filter-pill" data-category="Development">Development</button>
  <button class="filter-pill" data-category="Monitoring">Monitoring</button>
</div>

<div class="posts-grid mt-4" id="selfhosted-grid">
{% for app in site.data.selfhosted %}
  <article class="post-preview" data-category="{{ app.category }}">
    <h3>
      <a href="{{ '/self-hosted/' | append: app.id | relative_url }}">{{ app.title }}</a>
    </h3>
    <div class="post-meta">
      <span class="post-category">{{ app.category }}</span>
    </div>
    {% if app.subtitle %}
    <p class="card-subtitle">{{ app.subtitle }}</p>
    {% endif %}
    <p class="post-excerpt">{{ app.description }}</p>
    <a href="{{ '/self-hosted/' | append: app.id | relative_url }}" class="read-more">Learn More →</a>
    {% if app.github %}
    <a href="{{ app.github }}" target="_blank" rel="noopener noreferrer" class="read-more secondary-link">GitHub →</a>
    {% elsif app.official %}
    <a href="{{ app.official }}" target="_blank" rel="noopener noreferrer" class="read-more secondary-link">Official Site →</a>
    {% endif %}
  </article>
{% endfor %}
</div>

{% include no-results.html id="no-selfhosted-results" message="No applications found" %}

{% include filter-init.html search_id="selfhosted-search" grid_id="selfhosted-grid" no_results_id="no-selfhosted-results" %}
