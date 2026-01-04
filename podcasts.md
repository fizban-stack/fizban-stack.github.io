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

<div class="row g-4" id="podcasts-grid">
{% for podcast in site.data.podcasts %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: podcast.image | relative_url }}" class="card-img-top" alt="{{ podcast.title }}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ podcast.title }}</h5>
        <p class="card-text">{{ podcast.description }}</p>
        <div class="mt-auto">
          {% if podcast.website %}
          <a href="{{ podcast.website }}" target="_blank" class="btn btn-dark">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-podcasts-results" class="no-results" style="display: none; text-align: center; padding: 3rem; color: var(--text-secondary);">
  No podcasts found matching your search.
</div>

<style>
  .col-md-6.hidden,
  .col-lg-4.hidden {
    display: none !important;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('podcasts-search');
    const clearBtn = document.getElementById('podcasts-search-clear');
    const podcastCards = document.querySelectorAll('#podcasts-grid .project-card');
    const noResults = document.getElementById('no-podcasts-results');

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      if (query === '') {
        podcastCards.forEach(card => card.parentElement.classList.remove('hidden'));
        clearBtn.style.display = 'none';
        noResults.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      podcastCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
          card.parentElement.classList.remove('hidden');
          visibleCount++;
        } else {
          card.parentElement.classList.add('hidden');
        }
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', performSearch);

    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      performSearch();
      searchInput.focus();
    });
  });
</script>
