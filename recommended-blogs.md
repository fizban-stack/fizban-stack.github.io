---
layout: default
title: Recommended Cybersecurity Blogs
description: A curated collection of cybersecurity technical blogs covering offensive security, threat intelligence, security engineering, and investigative journalism.
---

# Recommended Cybersecurity Blogs

{% include search-box.html id="blogs-search" placeholder="Search blogs..." %}

<article>
<p>A curated collection of cybersecurity technical blogs that I follow regularly. These resources cover offensive security research, threat intelligence, malware analysis, security engineering, and investigative journalism. Whether you're a penetration tester, security analyst, researcher, or just passionate about cybersecurity, these blogs provide invaluable insights from industry experts and thought leaders.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Blogs</button>
  <button class="filter-pill" data-category="Offensive Security & Advanced Research">Offensive Security</button>
  <button class="filter-pill" data-category="Threat Intelligence & Malware Analysis">Threat Intelligence</button>
  <button class="filter-pill" data-category="Bug Bounty & Web Security Research">Bug Bounty</button>
  <button class="filter-pill" data-category="Security Engineering & Platform Research">Security Engineering</button>
  <button class="filter-pill" data-category="Specialized Research">Specialized Research</button>
  <button class="filter-pill" data-category="Strategic & News">Strategic & News</button>
</div>

<!-- Blogs Grid -->
<div class="row g-4" id="blogs-grid">
{% for blog in site.data.recommended-blogs %}
  <div class="col-md-6 col-lg-4" data-category="{{ blog.category }}">
    <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: blog.image | relative_url }}" class="card-img-top" alt="{{ blog.title }}" style="height: 200px; object-fit: contain;" loading="lazy">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <h5 class="card-title">{{ blog.title }}</h5>
        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ blog.description }}</p>

        <div class="blog-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ blog.category }}
        </div>

        <div class="mt-auto d-flex gap-2" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="{{ '/recommended-blogs/' | append: blog.id | relative_url }}" class="btn btn-dark" style="flex: 1 1 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">Learn More</a>
          {% if blog.website %}
          <a href="{{ blog.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">Visit Blog</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<!-- No Results Message -->
<div id="no-blogs-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No blogs found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'blogs-search',
    clearBtnId: 'blogs-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#blogs-grid > div[data-category]',
    noResultsId: 'no-blogs-results',
    filterPillSelector: '.filter-pill'
  });
</script>
