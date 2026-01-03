---
layout: default
title: Learning Journey
description: The professional learning journey and timeline of James Wells.
---

# My Learning Journey

<div class="timeline">
{% for event in site.data.timeline %}
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-date">{{ event.date }}</div>
    <div class="timeline-content">
      <h3><a href="{{ event.link }}" target="_blank">{{ event.title }}</a></h3>
      <p>{{ event.description }}</p>
    </div>
  </div>
{% endfor %}
</div>
