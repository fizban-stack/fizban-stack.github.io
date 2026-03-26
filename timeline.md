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
      <h3><a href="{{ event.link }}">{{ event.title }}</a></h3>
      <p>{{ event.description }}</p>
    </div>
  </div>
{% endfor %}
</div>

---

## Where I'm Heading

<div class="row g-4 mt-2">
  <div class="col-md-6">
    <div class="card h-100">
      <div class="card-body">
        <h3 style="color: var(--accent-cyan);">Certifications in Progress</h3>
        <ul style="color: var(--text-secondary); padding-left: 1.5rem; margin-bottom: 0;">
          <li>PNPT (Practical Network Penetration Tester) — TCM Security</li>
          <li>eJPT (eLearnSecurity Junior Penetration Tester)</li>
          <li>OSCP — longer-term goal</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card h-100">
      <div class="card-body">
        <h3 style="color: var(--accent-cyan);">Skills Being Developed</h3>
        <ul style="color: var(--text-secondary); padding-left: 1.5rem; margin-bottom: 0;">
          <li>PowerShell security scripting and automation</li>
          <li>Active Directory attack paths and hardening</li>
          <li>Threat hunting and DFIR workflows</li>
          <li>Python for security tooling</li>
        </ul>
      </div>
    </div>
  </div>
</div>
