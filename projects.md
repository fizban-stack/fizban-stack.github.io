---
layout: default
title: Projects
description: Explore the cybersecurity and homelab projects of James Wells.
---

# Projects

{% include search-box.html id="projects-search" placeholder="Search projects..." %}

<article>
<p>This is a list of some of the projects that I have built or taken a deep dive into. I have a blog post for most of these, but wanted a page that only listed project related topics. If I need to rebuild a service or relearn how something works after a few years, I want to be able to quickly come to this page and locate that project.</p>
</article>

<div class="row g-4" id="projects-grid">
{% for project in site.data.projects %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <div class="mt-auto d-flex gap-2">
          {% if project.blog %}
          <a href="{{ project.blog }}" target="_blank" class="btn btn-dark">Read Blog Post</a>
          {% endif %}
          {% if project.github %}
          <a href="{{ project.github }}" target="_blank" class="btn btn-outline-secondary">View on GitHub</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<div id="no-projects-results" class="no-results" style="display: none; text-align: center; padding: 3rem; color: var(--text-secondary);">
  No projects found matching your search.
</div>

<style>
  .col-md-6.hidden,
  .col-lg-4.hidden {
    display: none !important;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('projects-search');
    const clearBtn = document.getElementById('projects-search-clear');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('no-projects-results');

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      if (query === '') {
        projectCards.forEach(card => card.parentElement.classList.remove('hidden'));
        clearBtn.style.display = 'none';
        noResults.style.display = 'none';
        return;
      }

      clearBtn.style.display = 'block';

      projectCards.forEach(card => {
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
