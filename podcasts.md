---
layout: default
title: Recommended Podcasts
description: Cybersecurity and technology podcasts recommended by James Wells.
---

# Recommended Podcasts

{% include search-box.html id="podcasts-search" placeholder="Search podcasts..." %}

<article>
<p>These podcasts are not listed in any particular order. Over the last few years, I have spent a considerable amount of time listening to them while driving for work. I even got to the point that I would listen to them on long trips with my family. I got to listen to educational content and they got to sleep and not argue. The podcasts vary from deeply technical to general knowledge, but I found all of them engaging.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4">
  <button class="filter-pill active" data-category="all">All Podcasts</button>
  <button class="filter-pill" data-category="Technical">Technical</button>
  <button class="filter-pill" data-category="General Knowledge">General Knowledge</button>
  <button class="filter-pill" data-category="News & Updates">News & Updates</button>
  <button class="filter-pill" data-category="Educational">Educational</button>
</div>

<div class="row g-4" id="podcasts-grid">
{% for podcast in site.data.podcasts %}
  <div class="col-md-6 col-lg-4" data-category="{{ podcast.category }}">
    <div class="card project-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: podcast.image | relative_url }}" class="card-img-top" alt="{{ podcast.title }}" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <h5 class="card-title">{{ podcast.title }}</h5>
        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">{{ podcast.description }}</p>

        <div class="podcast-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ podcast.category }}
        </div>

        <div class="mt-auto">
          {% if podcast.website %}
          <a href="{{ podcast.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-dark" style="width: 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-podcasts-results" class="no-results" style="display: none;">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No podcasts found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<script src="{{ '/assets/js/filter-search.js' | relative_url }}"></script>
<script>
  initFilterSearch({
    searchInputId: 'podcasts-search',
    clearBtnId: 'podcasts-search-clear',
    cardSelector: '.project-card',
    containerSelector: '#podcasts-grid > div[data-category]',
    noResultsId: 'no-podcasts-results',
    filterPillSelector: '.filter-pill'
  });
</script>
