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
<div class="category-filters mb-4">
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
    <p style="color: var(--accent-cyan); font-size: 0.9rem; margin-bottom: 0.5rem;">{{ app.subtitle }}</p>
    {% endif %}
    <p class="post-excerpt">{{ app.description }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <a href="{{ '/self-hosted/' | append: app.id | relative_url }}" class="read-more">Learn More →</a>
      {% if app.github %}
      <a href="{{ app.github }}" target="_blank" rel="noopener noreferrer" class="read-more">GitHub →</a>
      {% elsif app.official %}
      <a href="{{ app.official }}" target="_blank" rel="noopener noreferrer" class="read-more">Official Site →</a>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>

<div id="no-selfhosted-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No applications found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'selfhosted-search',
    clearBtnId: 'selfhosted-search-clear',
    cardSelector: '.post-preview',
    containerSelector: '#selfhosted-grid > .post-preview[data-category]',
    noResultsId: 'no-selfhosted-results',
    filterPillSelector: '.filter-pill'
  });
</script>
