---
layout: default
title: Vulnerable Labs & Resources
description: Self-hostable vulnerable machines, containers, and cloud environments for security practice and research.
---

# Vulnerable Labs & Resources

{% include search-box.html id="labs-search" placeholder="Search vulnerable labs..." %}

<article>
<p>A curated collection of modern, self-hostable vulnerable machines and containers for security research, penetration testing practice, and training. When I started learning about cybersecurity, I did not realize how many free, easily deployable vulnerable test machines there were. I wanted to put this list together to help anyone else that is looking for a free way to learn about cybersecurity. Some of these have not been updated in a couple of years, but I have used a few and thought it was a great learning experience. These resources cover cloud security, web applications, Active Directory, APIs, Android, and specialized security domains. Over time I will be writing blogs posts to discuss my journey through them.</p>
</article>

<!-- Category Filter Pills -->
<div class="category-filters">
  <button class="filter-pill active" data-category="all">All Labs</button>
  <button class="filter-pill" data-category="Web Applications">Web Applications</button>
  <button class="filter-pill" data-category="Cloud & Infrastructure">Cloud & Infrastructure</button>
  <button class="filter-pill" data-category="Enterprise & Active Directory">Enterprise & AD</button>
  <button class="filter-pill" data-category="API Security">API Security</button>
  <button class="filter-pill" data-category="Android Security">Android Security</button>
  <button class="filter-pill" data-category="CVE Collection">CVE Collection</button>
  <button class="filter-pill" data-category="Training Platform">Training Platform</button>
</div>

<!-- Labs Grid -->
<div class="posts-grid" id="labs-grid">
{% for lab in site.data.vulnerable-labs %}
  <article class="post-preview" data-category="{{ lab.category }}">
    <h3>
      <a href="{{ '/vulnerable-labs/' | append: lab.id | relative_url }}">{{ lab.title }}</a>
    </h3>
    {% if lab.focus %}
    <p class="card-focus">{{ lab.focus }}</p>
    {% endif %}
    <p class="post-excerpt">{{ lab.description }}</p>
    <a href="{{ '/vulnerable-labs/' | append: lab.id | relative_url }}" class="read-more">Learn More →</a>
    {% if lab.github %}
    <a href="{{ lab.github }}" target="_blank" rel="noopener noreferrer" class="read-more" class="read-more secondary-link">GitHub →</a>
    {% endif %}
    {% if lab.website %}
    <a href="{{ lab.website }}" target="_blank" rel="noopener noreferrer" class="read-more" class="read-more secondary-link">Website →</a>
    {% endif %}
  </article>
{% endfor %}
</div>

{% include no-results.html id="no-labs-results" message="No labs found" %}

{% include filter-init.html search_id="labs-search" grid_id="labs-grid" no_results_id="no-labs-results" %}
