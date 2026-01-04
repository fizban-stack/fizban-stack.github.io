---
layout: default
title: Recommended Podcasts
description: Cybersecurity and technology podcasts recommended by James Wells.
---

# Recommended Podcasts
<article>
<p>These podcasts are not listed in any particular order. Over the last few years, I have spent a considerable amount of time listening to them while driving for work. I even got to the point that I would listen to them on long trips with my family. I got to listen to educational content and they got to sleep and not argue. The podcasts vary from deeply technical to general knowledge, but I found all of them engaging.</p>
</article>

<div class="row g-4">
{% for podcast in site.data.podcasts %}
  <div class="col-md-6 col-lg-4">
    <div class="card project-card h-100 d-flex flex-column">
      <img src="{{ '/assets/images/' | append: podcast.image | relative_url }}" class="card-img-top" alt="{{ podcast.title }}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ podcast.title }}</h5>
        <p class="card-text">{{ podcast.description }}</p>
        <div class="mt-auto">
          {% if podcast.website %}
          <a href="{{ podcast.website }}" target="_blank" class="btn btn-dark">Visit Website</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
{% endfor %}
</div>
