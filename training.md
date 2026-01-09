---
layout: default
title: Free Cybersecurity Training
description: Free cybersecurity training sites and resources curated by James Wells.
---

# Free Cybersecurity Training

{% include search-box.html id="training-search" placeholder="Search training programs..." %}

<article>
<p>These training programs are not listed in any particular order. Over the last few years, I have spent a considerable amount of time searching for and engaging with as much free cybersecurity content as possible. I thought it would be helpful to provide a list for anyone else that is searching through the vastness of the internet for quality cybersecurity training. The training programs vary from deeply technical to general knowledge, but I found all of them engaging and insightful in their own ways.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Training</button>
  <button class="filter-pill" data-category="Hands-on Labs">Hands-on Labs</button>
  <button class="filter-pill" data-category="Video Courses">Video Courses</button>
  <button class="filter-pill" data-category="Wargames">Wargames</button>
  <button class="filter-pill" data-category="CTF Challenges">CTF Challenges</button>
  <button class="filter-pill" data-category="Bug Bounty Training">Bug Bounty</button>
  <button class="filter-pill" data-category="Educational Resources">Educational</button>
  <button class="filter-pill" data-category="Write-ups & Guides">Write-ups</button>
</div>

<div class="row g-4" id="training-grid">
{% for training in site.data.training %}
  <div class="col-md-6 col-lg-4" data-category="{{ training.category }}">
    <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: training.image | relative_url }}" class="card-img-top" alt="{{ training.title }}" style="height: 200px; object-fit: cover;" loading="lazy">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <h5 class="card-title">{{ training.title }}</h5>
        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ training.description }}</p>

        <div class="training-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ training.category }}
        </div>

        <div class="mt-auto">
          {% if training.website %}
          <a href="{{ training.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-dark" style="width: 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-training-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No training programs found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'training-search',
    clearBtnId: 'training-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#training-grid > div[data-category]',
    noResultsId: 'no-training-results',
    filterPillSelector: '.filter-pill'
  });
</script>
