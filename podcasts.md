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

<div class="posts-grid" id="podcasts-grid">
{% for podcast in site.data.podcasts %}
  <article class="post-preview" data-category="{{ podcast.category }}">
    <h3>
      <a href="{{ '/podcasts/' | append: podcast.id | relative_url }}">{{ podcast.title }}</a>
    </h3>
    <div class="post-meta">
      <span class="post-category">{{ podcast.category }}</span>
    </div>
    <p class="post-excerpt">{{ podcast.description }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <a href="{{ '/podcasts/' | append: podcast.id | relative_url }}" class="read-more">Learn More →</a>
      {% if podcast.website %}
      <a href="{{ podcast.website }}" target="_blank" rel="noopener noreferrer" class="read-more">Visit Website →</a>
      {% endif %}
    </div>
  </article>
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
    cardSelector: '.post-preview',
    containerSelector: '#podcasts-grid > .post-preview[data-category]',
    noResultsId: 'no-podcasts-results',
    filterPillSelector: '.filter-pill'
  });
</script>
