---
layout: default
title: Recommended YouTube Channels
description: A curated collection of cybersecurity YouTube channels covering CTFs, bug bounty, malware analysis, conferences, and educational content.
---

# Recommended YouTube Channels

{% include search-box.html id="youtube-search" placeholder="Search channels..." %}

<article>
<p>A curated collection of cybersecurity YouTube channels that I watch regularly. These channels cover everything from CTF walkthroughs and bug bounty hunting to malware analysis, conference talks, and educational content. Whether you're just starting out or looking for advanced technical content, these creators deliver valuable insights and hands-on knowledge.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Channels</button>
  <button class="filter-pill" data-category="Binary Exploitation & CTF">CTF & Exploitation</button>
  <button class="filter-pill" data-category="CTF Walkthroughs">CTF Walkthroughs</button>
  <button class="filter-pill" data-category="Bug Bounty & Recon">Bug Bounty</button>
  <button class="filter-pill" data-category="Malware Analysis & Security Research">Malware Analysis</button>
  <button class="filter-pill" data-category="Ethical Hacking Education">Education</button>
  <button class="filter-pill" data-category="Hacker Conference">Conferences</button>
</div>

<!-- YouTube Channels Grid -->
<div class="row g-4" id="youtube-grid">
{% for channel in site.data.youtube %}
  <div class="col-md-6 col-lg-4" data-category="{{ channel.category }}">
    <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: channel.image | relative_url }}" class="card-img-top" alt="{{ channel.title }}" style="height: 200px; object-fit: contain;" loading="lazy">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <h5 class="card-title">{{ channel.title }}</h5>
        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ channel.description }}</p>

        <div class="youtube-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ channel.category }}
        </div>

        <div class="mt-auto d-flex gap-2" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="{{ '/recommended-youtube-channels/' | append: channel.id | relative_url }}" class="btn btn-dark" style="flex: 1 1 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">Learn More</a>
          {% if channel.website %}
          <a href="{{ channel.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">Visit Channel</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<!-- No Results Message -->
<div id="no-youtube-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No channels found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'youtube-search',
    clearBtnId: 'youtube-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#youtube-grid > div[data-category]',
    noResultsId: 'no-youtube-results',
    filterPillSelector: '.filter-pill'
  });
</script>
