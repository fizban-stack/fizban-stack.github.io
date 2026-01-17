---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: watchTowr Labs
focus: External attack surface management and zero-days
category: Offensive Research
description: Sophisticated research into enterprise software zero-days and the reality of modern attack surfaces.
image: recommended-blogs/watchtowr.webp
website: https://labs.watchtowr.com/
rss_feed: https://labs.watchtowr.com/rss/
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

watchTowr Labs is known for its "no-nonsense" approach to security research, often revealing critical flaws in enterprise infrastructure software.

## Key Focus Areas
- **Appliance Vulnerabilities**: RCEs in VPNs, firewalls, and gateway devices.
- **Supply Chain Risks**: Identifying vulnerabilities in common third-party libraries.
- **Real-World Impact**: Demonstrating how attackers move from a single exploit to full enterprise compromise.