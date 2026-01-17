---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Embrace The Red
focus: AI security, Red Teaming, and Azure
category: AI & Cloud Security
description: Michael Selinger's research at the forefront of AI safety and cloud-based offensive operations.
image: recommended-blogs/embrace-the-red.webp
website: https://embracethered.com/blog/
rss_feed: https://embracethered.com/blog/index.xml
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

Embrace The Red is a critical resource for understanding the security implications of the AI revolution and modern Azure environments.

## Key Research Areas
- **Prompt Injection**: Discovering and defending against indirect prompt injection in LLMs.
- **AI Agent Security**: Exploiting autonomous agents and integrated AI systems.
- **Azure Red Teaming**: Advanced tactics for lateral movement and privilege escalation in Microsoft Cloud.