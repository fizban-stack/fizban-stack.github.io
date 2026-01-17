---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Praetorian Security
focus: Offensive security research and cryptography
category: Security Engineering
description: Advanced research into software security, cryptography, and complex system exploitation.
image: recommended-blogs/praetorian.webp
website: https://www.praetorian.com/blog/
rss_feed: https://www.praetorian.com/blog/feed/
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

Praetorian combines engineering rigor with offensive research to solve complex security problems.

## Key Topics
- **Cloud Security**: Automated tools and techniques for cloud auditing.
- **Cryptography**: Deep dives into the security of cryptographic implementations.
- **Product Security**: Identifying vulnerabilities in enterprise-grade software products.