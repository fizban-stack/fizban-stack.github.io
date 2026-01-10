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

<div class="posts-grid" id="training-grid">
{% for training in site.data.training %}
  <article class="post-preview" data-category="{{ training.category }}">
    <h3>
      <a href="{{ '/training/' | append: training.id | relative_url }}">{{ training.title }}</a>
    </h3>
    <div class="post-meta">
      <span class="post-category">{{ training.category }}</span>
    </div>
    <p class="post-excerpt">{{ training.description }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <a href="{{ '/training/' | append: training.id | relative_url }}" class="read-more">Learn More →</a>
      {% if training.website %}
      <a href="{{ training.website }}" target="_blank" rel="noopener noreferrer" class="read-more">Visit Website →</a>
      {% endif %}
    </div>
  </article>
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
    cardSelector: '.post-preview',
    containerSelector: '#training-grid > .post-preview[data-category]',
    noResultsId: 'no-training-results',
    filterPillSelector: '.filter-pill'
  });
</script>
