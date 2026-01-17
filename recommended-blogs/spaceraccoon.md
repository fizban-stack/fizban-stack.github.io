---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Spaceraccoon
focus: Cloud-native security and SaaS exploitation
category: Modern Web Security
description: Focused research on modern SaaS stacks, cloud-native vulnerabilities, and creative bug bounty write-ups.
image: recommended-blogs/spaceraccoon.webp
website: https://spaceraccoon.dev/
rss_feed: https://spaceraccoon.dev/feed.xml
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

## Key Topics
- **SaaS Tenancy**: Breaking isolation in multi-tenant environments.
- **Cloud Misconfigurations**: Exploiting AWS/GCP/Azure specific features.
- **Webhook Security**: Analyzing the "set and forget" vulnerabilities in modern integrations.