---
layout: default
title: Learning Journey
description: The professional learning journey and timeline of James Wells.
---

# My Learning Journey
<article>
<p>This is a timeline that I wanted to put some of the bigger milestones of my career progression into. I wanted to use it for my portfolio, but I also wanted to be able to look back and see my progress. Sometimes when you are pursuing a goal, it feels like you are in the same place that you started. It might feel like you have spent years learning, but are not much more knowledgeable, especially when compared to the cybersecurity legends. I can use this timeline to keep myself grounded in my own journey instead of trying to compare it to everyone elses.</p>
</article>

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
