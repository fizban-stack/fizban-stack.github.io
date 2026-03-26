---
layout: default
title: Write-ups
description: Security lab write-ups, CTF solutions, and hands-on exercise documentation by James Wells.
---

# Write-ups

<article>
<p>Hands-on security write-ups from lab exercises, vulnerable machine walkthroughs, and cybersecurity tool deep-dives. These document my practical learning — both for my own reference and for anyone following a similar path. I focus on understanding <em>why</em> something works, not just the steps.</p>
</article>

{% assign writeup_posts = site.posts | where: "category", "Writeup" %}
{% assign cybersecurity_posts = site.posts | where: "category", "Cybersecurity" %}

{% if writeup_posts.size > 0 %}
<div class="blog-index">
  <h2 class="section-title">Lab Write-ups</h2>
  <div class="row g-4">
    {% for post in writeup_posts %}
      <div class="col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
            </h5>
            <div style="font-size: 0.8rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
              {{ post.date | date: "%B %d, %Y" }}
            </div>
            {% if post.excerpt %}
              <p class="card-text" style="flex-grow: 1;">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
            {% endif %}
            <div class="mt-auto">
              <a href="{{ post.url | relative_url }}" class="btn btn-dark btn-sm" style="width: 100%; text-align: center;">Read Write-up</a>
            </div>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
{% endif %}

<div class="blog-index">
  <h2 class="section-title">Cybersecurity Deep Dives</h2>
  <div class="row g-4">
    {% for post in cybersecurity_posts %}
      <div class="col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <a href="{{ post.url | relative_url }}" style="color: var(--accent-cyan); text-decoration: none;">{{ post.title }}</a>
            </h5>
            <div style="font-size: 0.8rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
              {{ post.date | date: "%B %d, %Y" }}
            </div>
            {% if post.excerpt %}
              <p class="card-text" style="flex-grow: 1;">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
            {% endif %}
            <div class="mt-auto">
              <a href="{{ post.url | relative_url }}" class="btn btn-dark btn-sm" style="width: 100%; text-align: center;">Read More</a>
            </div>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<article>
<h2>Coming Soon</h2>
<p>I plan to add write-ups from:</p>
<ul>
  <li>Ludus/Proxmox AD lab attack paths</li>
  <li>Hack The Box machines</li>
  <li>TryHackMe rooms</li>
  <li>Custom vulnerable lab builds</li>
</ul>
<p>If you're working through similar challenges, feel free to <a href="{{ '/contact' | relative_url }}">reach out</a> — I'm always happy to compare notes.</p>
</article>
