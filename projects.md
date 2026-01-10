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

<!-- Category Filter Pills -->
<div class="category-filters">
  <button class="filter-pill active" data-category="all">All Projects</button>
  <button class="filter-pill" data-category="Security">Security</button>
  <button class="filter-pill" data-category="Networking">Networking</button>
  <button class="filter-pill" data-category="Infrastructure">Infrastructure</button>
  <button class="filter-pill" data-category="Hardware">Hardware</button>
</div>

<div class="posts-grid" id="projects-grid">
{% for project in site.data.projects %}
  <article class="post-preview" data-category="{{ project.category }}">
    <h3>
      <a href="{% if project.blog %}{{ project.blog }}{% else %}#{% endif %}">{{ project.title }}</a>
    </h3>
    <div class="post-meta">
      <span class="post-category">{{ project.category }}</span>
    </div>
    <p class="post-excerpt">{{ project.description }}</p>
    {% if project.blog %}
    <a href="{{ project.blog }}" target="_blank" rel="noopener noreferrer" class="read-more">Read Blog Post →</a>
    {% endif %}
    {% if project.github %}
    <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer" class="read-more secondary-link">View on GitHub →</a>
    {% endif %}
  </article>
{% endfor %}
</div>

{% include no-results.html id="no-projects-results" message="No projects found" %}

{% include filter-init.html search_id="projects-search" grid_id="projects-grid" no_results_id="no-projects-results" %}
