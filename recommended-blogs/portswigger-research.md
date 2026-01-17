---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: PortSwigger Research
focus: Novel web attack classes and HTTP protocol exploitation
category: Web Security Research
description: The definitive source for groundbreaking web vulnerability research, led by industry pioneers like James Kettle.
image: recommended-blogs/portswigger.webp
website: https://portswigger.net/research
rss_feed: https://portswigger.net/blog/rss
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

PortSwigger Research doesn't just find bugs; they define new classes of vulnerabilities. Their work fundamentally changes how the industry understands the relationship between web servers, proxies, and browsers.

## Notable Research Pillars

### Protocol Interference
- **HTTP Request Smuggling**: Evolution of desynchronization attacks.
- **H2C Smuggling**: Exploiting HTTP/2 cleartext upgrades.
- **Request Tunnelling**: Breaking through architectural boundaries.

### Cache & Architecture
- **Web Cache Poisoning**: Uncovering unkeyed inputs in global CDNs.
- **CPDoS**: Cache-based Denial of Service methodologies.

### Server-Side Exploitation
- **SSRF Reimagined**: Advanced techniques to hit internal metadata services.
- **Template Injection**: Discovering RCE in modern UI frameworks.

## 2026 Innovation
In 2026, PortSwigger has pivoted heavily into **Browser-Level Vulnerabilities** and **Advanced API Exploitation**, documenting how client-side state management can be weaponized against the backend.