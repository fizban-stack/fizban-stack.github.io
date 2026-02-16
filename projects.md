---
layout: default
title: Projects
description: Explore the cybersecurity and homelab projects of James Wells.
---

# Projects

{% include search-box.html id="projects-search" placeholder="Search projects..." %}

<article>
<p>This is a list of some of the projects that I have built or taken a deep dive into. I have a blog post for most of these, but wanted a page that only listed project related topics. If I need to rebuild a service or relearn how something works after a few years, I want to be able to quickly come to this page and locate that project.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Projects</button>
  <button class="filter-pill" data-category="Security">Security</button>
  <button class="filter-pill" data-category="Networking">Networking</button>
  <button class="filter-pill" data-category="Infrastructure">Infrastructure</button>
  <button class="filter-pill" data-category="Hardware">Hardware</button>
</div>

<div class="row g-4" id="projects-grid">
{% for project in site.data.projects %}
  <div class="col-md-6 col-lg-4" data-category="{{ project.category }}">
    <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}" style="height: 200px; object-fit: contain;" loading="lazy">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ project.description }}</p>

        <div class="project-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ project.category }}
        </div>

        <div class="mt-auto d-flex gap-2" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          {% if project.blog %}
          <a href="{{ project.blog }}" target="_blank" rel="noopener noreferrer" class="btn btn-dark" style="flex: 1 1 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">Read Blog Post</a>
          {% endif %}
          {% if project.github %}
          <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">View on GitHub</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-projects-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No projects found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'projects-search',
    clearBtnId: 'projects-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#projects-grid > div[data-category]',
    noResultsId: 'no-projects-results',
    filterPillSelector: '.filter-pill'
  });
</script>
