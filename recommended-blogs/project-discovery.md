---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: ProjectDiscovery Blog
focus: Automation, recon pipelines, and protocol-level scanning
category: Security Tooling & Automation
description: Technical blueprints for building modern recon pipelines and the engineering behind industry-standard security tools.
image: recommended-blogs/projectdiscovery.webp
website: https://blog.projectdiscovery.io/
rss_feed: https://blog.projectdiscovery.io/rss/
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

ProjectDiscovery has revolutionized the speed at which hunters scan the internet. Their blog explains the "why" behind tools like Nuclei, Subfinder, and HTTPX.

## Key Topics
- **Template-Based Scanning**: How to write effective Nuclei templates for 2026 vulnerabilities.
- **Cloud Recon**: Techniques for scanning massive IP ranges efficiently.
- **Scaling Security**: Engineering challenges of running thousands of concurrent scans.