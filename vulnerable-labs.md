---
layout: default
title: Vulnerable Labs & Resources
description: Self-hostable vulnerable machines, containers, and cloud environments for security practice and research.
---

# Vulnerable Labs & Resources

{% include search-box.html id="labs-search" placeholder="Search vulnerable labs..." %}

<article>
<p>A curated collection of modern, self-hostable vulnerable machines and containers for security research, penetration testing practice, and training. When I started learning about cybersecurity, I did not realize how many free, easily deployable vulnerable test machines there were. I wanted to put this list together to help anyone else that is looking for a free way to learn about cybersecurity. Some of these have not been updated in a couple of years, but I have used a few and thought it was a great learning experience. These resources cover cloud security, web applications, Active Directory, APIs, Android, and specialized security domains. Over time I will be writing blogs posts to discuss my journey through them.</p>

<div class="alert alert-warning" role="alert" style="background-color: var(--warning-bg, #fff3cd); border: 1px solid var(--warning-border, #ffc107); border-radius: 6px; padding: 1rem; margin-bottom: 1.5rem; color: var(--text-primary);">
  <strong>⚠️ Security Notice:</strong> These applications are intentionally vulnerable. Only deploy in isolated lab environments. Never expose to the internet or production networks.
</div>
</article>

<!-- Category Filter Pills -->
<div class="category-filters mb-4" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
  <button class="filter-pill active" data-category="all" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--accent-color); color: var(--bg-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    All Labs
  </button>
  <button class="filter-pill" data-category="Web Applications" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    Web Applications
  </button>
  <button class="filter-pill" data-category="Cloud & Infrastructure" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    Cloud & Infrastructure
  </button>
  <button class="filter-pill" data-category="Enterprise & Active Directory" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    Enterprise & AD
  </button>
  <button class="filter-pill" data-category="API Security" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    API Security
  </button>
  <button class="filter-pill" data-category="Android Security" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    Android Security
  </button>
  <button class="filter-pill" data-category="CVE Collection" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    CVE Collection
  </button>
  <button class="filter-pill" data-category="Training Platform" style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;">
    Training Platform
  </button>
</div>

<!-- Labs Grid -->
<div class="row g-4" id="labs-grid">
{% for lab in site.data.vulnerable-labs %}
  <div class="col-md-6 col-lg-4" data-category="{{ lab.category }}">
    <div class="card lab-card h-100 d-flex flex-column" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
      <img src="{{ '/assets/images/' | append: lab.image | relative_url }}" class="card-img-top" alt="{{ lab.title }}" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h5 class="card-title" style="margin: 0; flex: 1;">{{ lab.title }}</h5>
          <span class="lab-type-badge" style="background: var(--accent-color); color: var(--bg-primary); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; margin-left: 0.5rem;">
            {{ lab.type }}
          </span>
        </div>

        <div class="lab-focus" style="color: var(--accent-color); font-size: 0.85rem; font-weight: 500; margin-bottom: 0.75rem;">
          {{ lab.focus }}
        </div>

        <p class="card-text" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">
          {{ lab.description }}
        </p>

        <div class="lab-category" style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <strong>Category:</strong> {{ lab.category }}
        </div>

        <div class="mt-auto d-flex gap-2" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="{{ '/vulnerable-labs/' | append: lab.id | relative_url }}" class="btn btn-dark" style="flex: 1 1 100%; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            Learn More
          </a>
          {% if lab.github %}
          <a href="{{ lab.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            GitHub
          </a>
          {% endif %}
          {% if lab.website %}
          <a href="{{ lab.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary" style="flex: 1; text-align: center; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem; min-width: fit-content;">
            Website
          </a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<!-- No Results Message -->
<div id="no-labs-results" class="no-results" style="display: none; text-align: center; padding: 3rem; color: var(--text-secondary);">
  <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No labs found</p>
  <p style="font-size: 0.9rem;">Try adjusting your search or filter criteria</p>
</div>

<style>
  /* Hide filtered cards */
  .col-md-6.hidden,
  .col-lg-4.hidden {
    display: none !important;
  }

  /* Card hover effects */
  .lab-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  /* Filter pill hover effects */
  .filter-pill:hover {
    border-color: var(--accent-color) !important;
  }

  .filter-pill.active {
    background: var(--accent-color) !important;
    color: var(--bg-primary) !important;
    border-color: var(--accent-color) !important;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .category-filters {
      justify-content: center;
    }

    .filter-pill {
      font-size: 0.8rem !important;
      padding: 0.4rem 0.8rem !important;
    }
  }

  /* Terminal-style accent for cybersecurity aesthetic */
  .alert-warning strong {
    font-family: 'Courier New', monospace;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('labs-search');
    const clearBtn = document.getElementById('labs-search-clear');
    const labCards = document.querySelectorAll('.lab-card');
    const labContainers = document.querySelectorAll('#labs-grid > div[data-category]');
    const noResults = document.getElementById('no-labs-results');
    const filterPills = document.querySelectorAll('.filter-pill');

    let currentCategory = 'all';
    let currentSearchQuery = '';

    /**
     * Performs combined search and filter operation
     * Filters labs based on both category selection and search query
     */
    function performFilter() {
      const query = currentSearchQuery.toLowerCase().trim();
      let visibleCount = 0;

      labContainers.forEach((container, index) => {
        const card = labCards[index];
        const category = container.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const focus = card.querySelector('.lab-focus').textContent.toLowerCase();
        const type = card.querySelector('.lab-type-badge').textContent.toLowerCase();

        // Check category filter
        const categoryMatch = currentCategory === 'all' || category === currentCategory;

        // Check search query (searches across title, description, focus, and type)
        const searchMatch = query === '' ||
                           title.includes(query) ||
                           description.includes(query) ||
                           focus.includes(query) ||
                           type.includes(query) ||
                           category.toLowerCase().includes(query);

        // Show only if both category and search match
        if (categoryMatch && searchMatch) {
          container.classList.remove('hidden');
          visibleCount++;
        } else {
          container.classList.add('hidden');
        }
      });

      // Show/hide no results message
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';

      // Update clear button visibility
      if (clearBtn) {
        clearBtn.style.display = query === '' ? 'none' : 'block';
      }
    }

    /**
     * Handle search input changes
     */
    searchInput.addEventListener('input', function() {
      currentSearchQuery = this.value;
      performFilter();
    });

    /**
     * Handle search clear button
     */
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentSearchQuery = '';
        performFilter();
        searchInput.focus();
      });
    }

    /**
     * Handle category filter pill clicks
     */
    filterPills.forEach(pill => {
      pill.addEventListener('click', function() {
        // Update active state
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');

        // Update current category
        currentCategory = this.getAttribute('data-category');

        // Perform filter
        performFilter();
      });
    });

    /**
     * Keyboard accessibility for filter pills
     */
    filterPills.forEach(pill => {
      pill.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      // Make pills keyboard focusable
      pill.setAttribute('tabindex', '0');
      pill.setAttribute('role', 'button');
    });

    // Initialize with all labs visible
    performFilter();
  });
</script>
