---
layout: default
title: Projects
description: Explore the cybersecurity and homelab projects of James Wells.
---

# Projects

{% include structured-data-itemlist.html list_name="Projects" items=site.data.projects item_type="SoftwareApplication" %}

<div class="row g-4">
{% for project in site.data.projects %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <div class="mt-auto d-flex gap-2">
          {% if project.blog %}
          <a href="{{ project.blog }}" target="_blank" rel="noopener noreferrer" class="btn btn-dark">Read Blog Post</a>
          {% endif %}
          {% if project.github %}
          <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary">View on GitHub</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>
