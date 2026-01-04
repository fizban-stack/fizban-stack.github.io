---
layout: default
title: Projects
description: Explore the cybersecurity and homelab projects of James Wells.
---

# Projects
<article>
<p>This is a list of some of the projects that I have built or taken a deep dive into. I have a blog post for most of these, but wanted a page that only listed project related topics. If I need to rebuild a service or relearn how something works after a few years, I want to be able to quickly come to this page and locate that project.</p>
</article>

<div class="row g-4">
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
