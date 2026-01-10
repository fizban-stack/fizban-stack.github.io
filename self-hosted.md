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

<div class="row g-4 mt-4" id="selfhosted-grid">
{% for app in site.data.selfhosted %}
  <div class="col-md-6 col-lg-4" data-category="{{ app.category }}">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: app.image | relative_url }}" class="card-img-top" alt="{{ app.title }}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ app.title }}</h5>
        <p class="text-muted small mb-3">{{ app.subtitle }}</p>
        <p class="card-text flex-grow-1">{{ app.description }}</p>

        <div class="app-category">
          <strong>Category:</strong> {{ app.category }}
        </div>

        <div class="mt-auto d-flex gap-2 flex-wrap">
          <a href="{{ '/self-hosted/' | append: app.id | relative_url }}" class="btn btn-dark flex-fill">Learn More</a>
          {% if app.github %}
          <a href="{{ app.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary flex-fill">GitHub</a>
          {% elsif app.official %}
          <a href="{{ app.official }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary flex-fill">Official Site</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-selfhosted-results" class="no-results">
  <p class="fs-5 mb-2">No applications found</p>
  <p class="small">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'selfhosted-search',
    clearBtnId: 'selfhosted-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#selfhosted-grid > div[data-category]',
    noResultsId: 'no-selfhosted-results',
    filterPillSelector: '.filter-pill'
  });
</script>
