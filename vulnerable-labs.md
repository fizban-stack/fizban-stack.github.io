---
layout: default
title: Vulnerable Labs & Resources
description: Self-hostable vulnerable machines, containers, and cloud environments for security practice and research.
---

# Vulnerable Labs & Resources

{% include search-box.html id="labs-search" placeholder="Search vulnerable labs..." %}

<article>
<p>A curated collection of modern, self-hostable vulnerable machines and containers for security research, penetration testing practice, and training. When I started learning about cybersecurity, I did not realize how many free, easily deployable vulnerable test machines there were. I wanted to put this list together to help anyone else that is looking for a free way to learn about cybersecurity. Some of these have not been updated in a couple of years, but I have used a few and thought it was a great learning experience. These resources cover cloud security, web applications, Active Directory, APIs, Android, and specialized security domains. Over time I will be writing blogs posts to discuss my journey through them.</p>
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

<div class="row g-4" id="labs-grid">
{% for lab in site.data.vulnerable-labs %}
  <div class="col-md-6 col-lg-4" data-category="{{ lab.category }}">
    <div class="card lab-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: lab.image | relative_url }}" class="card-img-top" alt="{{ lab.title }}">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title m-0 flex-grow-1">{{ lab.title }}</h5>
          <span class="lab-type-badge small ms-2">{{ lab.type }}</span>
        </div>

        <div class="lab-focus">{{ lab.focus }}</div>

        <p class="card-text flex-grow-1">{{ lab.description }}</p>

        <div class="lab-category">
          <strong>Category:</strong> {{ lab.category }}
        </div>

        <div class="mt-auto d-flex gap-2 flex-wrap">
          <a href="{{ '/vulnerable-labs/' | append: lab.id | relative_url }}" class="btn btn-dark flex-fill">Learn More</a>
          {% if lab.github %}
          <a href="{{ lab.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary flex-fill">GitHub</a>
          {% endif %}
          {% if lab.website %}
          <a href="{{ lab.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary flex-fill">Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-labs-results" class="no-results">
  <p class="fs-5 mb-2">No labs found</p>
  <p class="small">Try adjusting your search or filter criteria</p>
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
