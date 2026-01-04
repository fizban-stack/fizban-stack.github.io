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

<div class="row g-4" id="training-grid">
{% for training in site.data.training %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: training.image | relative_url }}" class="card-img-top" alt="{{ training.title }}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ training.title }}</h5>
        <p class="card-text">{{ training.description }}</p>
        <div class="mt-auto">
          {% if training.website %}
          <a href="{{ training.website }}" target="_blank" class="btn btn-dark">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-training-results" class="no-results" style="display: none; text-align: center; padding: 3rem; color: var(--text-secondary);">
  No training programs found matching your search.
</div>

<style>
  .col-md-6.hidden,
  .col-lg-4.hidden {
    display: none !important;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('training-search');
    const clearBtn = document.getElementById('training-search-clear');
    const trainingCards = document.querySelectorAll('#training-grid .project-card');
    const noResults = document.getElementById('no-training-results');

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      if (query === '') {
        trainingCards.forEach(card => card.parentElement.classList.remove('hidden'));
        clearBtn.style.display = 'none';
        noResults.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      trainingCards.forEach(card => {
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
