---
layout: default
title: Free Cybersecurity Training
description: Free cybersecurity training sites and resources curated by James Wells.
---

# Free Cybersecurity Training

{% include structured-data-itemlist.html list_name="Free Cybersecurity Training" items=site.data.training item_type="Course" %}

<div class="row g-4">
{% for training in site.data.training %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: training.image | relative_url }}" class="card-img-top" alt="{{ training.title }}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ training.title }}</h5>
        <p class="card-text">{{ training.description }}</p>
        <div class="mt-auto">
          {% if training.website %}
          <a href="{{ training.website }}" target="_blank" rel="noopener noreferrer" class="btn btn-dark">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>
