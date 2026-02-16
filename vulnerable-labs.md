---
layout: default
title: Vulnerable Labs & Resources
description: Self-hostable vulnerable machines, containers, and cloud environments for security practice and research.
---

# Vulnerable Labs & Resources

{% include search-box.html id="labs-search" placeholder="Search vulnerable labs..." %}

<article>
<p>A curated collection of modern, self-hostable vulnerable machines and containers for security research, penetration testing practice, and training. When I started learning about cybersecurity, I did not realize how many free, easily deployable vulnerable test machines there were. I wanted to put this list together to help anyone else that is looking for a free way to learn about cybersecurity. Some of these have not been updated in a couple of years, but I have used a few of them and thought they were great learning experiences. These resources cover cloud security, web applications, Active Directory, APIs, Android, and specialized security domains. Over time I will be writing blogs posts to discuss my journey through them.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Labs</button>
  <button class="filter-pill" data-category="Web Applications">Web Applications</button>
  <button class="filter-pill" data-category="Cloud & Infrastructure">Cloud & Infrastructure</button>
  <button class="filter-pill" data-category="Enterprise & Active Directory">Enterprise & AD</button>
  <button class="filter-pill" data-category="API Security">API Security</button>
  <button class="filter-pill" data-category="Android Security">Android Security</button>
  <button class="filter-pill" data-category="CVE Collection">CVE Collection</button>
  <button class="filter-pill" data-category="Training Platform">Training Platform</button>
</div>

<!-- Labs Grid -->
<div class="row g-4" id="labs-grid">
{% for lab in site.data.vulnerable-labs %}
  <div class="col-md-6 col-lg-4" data-category="{{ lab.category }}">
    <div class="card lab-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: lab.image | relative_url }}" class="card-img-top" alt="{{ lab.title }}" style="height: 200px; object-fit: contain;">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h5 class="card-title" style="margin: 0; flex: 1;">{{ lab.title }}</h5>
          <span class="lab-type-badge" style="background: var(--accent-green); color: #0a0e27; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; margin-left: 0.5rem;">
            {{ lab.type }}
          </span>
        </div>

        <div class="lab-focus" style="color: var(--accent-green); font-size: 0.85rem; font-weight: 500; margin-bottom: 0.75rem;">
          {{ lab.focus }}
        </div>

        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">
          {{ lab.description }}
        </p>

        <div class="lab-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ lab.category }}
        </div>

        <div class="mt-auto d-flex gap-2" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="{{ '/vulnerable-labs/' | append: lab.id | relative_url }}" class="btn btn-dark" style="flex: 1 1 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            Learn More
          </a>
          {% if lab.github %}
          <a href="{{ lab.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            GitHub
          </a>
          {% endif %}
          {% if lab.website %}
          <a href="{{ lab.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            Website
          </a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<!-- No Results Message -->
<div id="no-labs-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No labs found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'labs-search',
    clearBtnId: 'labs-search-clear',
    cardSelector: '.lab-card',
    containerSelector: '#labs-grid > div[data-category]',
    noResultsId: 'no-labs-results',
    filterPillSelector: '.filter-pill'
  });
</script>
