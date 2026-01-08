/**
 * Filter and Search Functionality
 * Shared across Projects, Training, Podcasts, Self-Hosted, and Vulnerable Labs pages
 *
 * Usage:
 * Initialize with: initFilterSearch(config)
 *
 * Config object:
 * {
 *   searchInputId: 'projects-search',      // ID of search input
 *   clearBtnId: 'projects-search-clear',   // ID of clear button
 *   cardSelector: '.project-card',         // Selector for cards
 *   containerSelector: '#projects-grid > div[data-category]', // Container selector
 *   noResultsId: 'no-projects-results',    // ID of no results message
 *   filterPillSelector: '.filter-pill'     // Selector for filter pills
 * }
 */

function initFilterSearch(config) {
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById(config.searchInputId);
    const clearBtn = document.getElementById(config.clearBtnId);
    const cards = document.querySelectorAll(config.cardSelector);
    const containers = document.querySelectorAll(config.containerSelector);
    const noResults = document.getElementById(config.noResultsId);
    const filterPills = document.querySelectorAll(config.filterPillSelector);

    let currentCategory = 'all';
    let currentSearchQuery = '';

    function performFilter() {
      const query = currentSearchQuery.toLowerCase().trim();
      let visibleCount = 0;

      containers.forEach((container, index) => {
        const card = cards[index];
        const category = container.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const subtitle = card.querySelector('.text-muted')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const focus = card.querySelector('.lab-focus')?.textContent.toLowerCase() || '';
        const type = card.querySelector('.lab-type-badge')?.textContent.toLowerCase() || '';

        const categoryMatch = currentCategory === 'all' || category === currentCategory;
        const searchMatch = query === '' ||
                           title.includes(query) ||
                           subtitle.includes(query) ||
                           description.includes(query) ||
                           focus.includes(query) ||
                           type.includes(query) ||
                           category.toLowerCase().includes(query);

        if (categoryMatch && searchMatch) {
          container.classList.remove('hidden');
          visibleCount++;
        } else {
          container.classList.add('hidden');
        }
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      if (clearBtn) {
        clearBtn.style.display = query === '' ? 'none' : 'block';
      }
    }

    searchInput.addEventListener('input', function() {
      currentSearchQuery = this.value;
      performFilter();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentSearchQuery = '';
        performFilter();
        searchInput.focus();
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', function() {
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-category');
        performFilter();
      });

      pill.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      pill.setAttribute('tabindex', '0');
      pill.setAttribute('role', 'button');
    });

    performFilter();
  });
}
