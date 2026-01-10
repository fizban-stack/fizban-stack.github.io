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
<div class="category-filters">
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
    <a href="{{ '/podcasts/' | append: podcast.id | relative_url }}" class="read-more">Learn More →</a>
    {% if podcast.website %}
    <a href="{{ podcast.website }}" target="_blank" rel="noopener noreferrer" class="read-more secondary-link">Visit Website →</a>
    {% endif %}
  </article>
{% endfor %}
</div>

{% include no-results.html id="no-podcasts-results" message="No podcasts found" %}

{% include filter-init.html search_id="podcasts-search" grid_id="podcasts-grid" no_results_id="no-podcasts-results" %}
