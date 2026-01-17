---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Joseph Thacker (rez0)
focus: AI Security, LLMs, and creative hacking
category: AI & Emerging Tech
description: Leading-edge research on hacking AI systems, Large Language Models (LLMs), and developer productivity.
image: recommended-blogs/rez0.webp
website: https://josephthacker.com/
rss_feed: https://josephthacker.com/feed.xml
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

### Latest Stories
<ul>
  {% assign current_feed = site.data.rss_feeds | where: "url", page.rss_feed | first %}
  {% if current_feed %}
    {% for entry in current_feed.entries limit:5 %}
      <li>
        <a href="{{ entry.link }}" target="_blank">{{ entry.title }}</a>
        <br>
        <small>{{ entry.published | date: "%B %d, %Y" }}</small>
      </li>
    {% endfor %}
  {% else %}
    <li>Fetching latest stories... Check back soon.</li>
  {% endif %}
</ul>

---

## The AI Frontier
Joseph (rez0) is a pioneer in **AI Security**. His blog is the go-to resource for understanding how to hack LLM-integrated applications and the future of "AI-Powered Reconnaissance."