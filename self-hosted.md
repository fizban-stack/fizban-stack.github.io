---
layout: default
title: Self-Hosted Applications
description: Self-hosted applications and services used by James Wells in his home lab.
---

# Self-Hosted Applications

This page showcases some of my favorite self-hosted applications that I use in my home lab. These tools help me manage infrastructure, learn new technologies, and maintain my homelab environment.

<article>
  <h4>Why Self-Host?</h4>
  <p>Self-hosting gives you complete control over your data, helps you learn system administration, and provides hands-on experience with technologies used in enterprise environments. It has been an essential part of my cybersecurity learning journey.</p>
</article>



<div class="row g-4 mt-4">
{% for app in site.data.selfhosted %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: app.image | relative_url }}" class="card-img-top" alt="{{ app.title }}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ app.title }}</h5>
        <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 0.75rem;">{{ app.subtitle }}</p>
        <p class="card-text">{{ app.description }}</p>
        <div class="mt-auto">
          <a href="{{ '/self-hosted/' | append: app.id | relative_url }}" class="btn btn-dark">Learn More</a>
          {% if app.github %}
          <a href="{{ app.github }}" target="_blank" class="btn btn-outline-secondary ms-2">GitHub</a>
          {% elsif app.official %}
          <a href="{{ app.official }}" target="_blank" class="btn btn-outline-secondary ms-2">Official Site</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>
