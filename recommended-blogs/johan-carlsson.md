---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Johan Carlsson (joaxcar)
focus: Web security, JavaScript, and GitLab research
category: Web Security
description: Meticulous research into modern JavaScript frameworks and the complex attack surface of DevOps platforms.
image: recommended-blogs/joaxcar.webp
website: https://blog.joaxcar.com/
rss_feed: https://joaxcar.com/blog/feed/
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

Johan Carlsson (joaxcar) is renowned for his ability to find high-impact bugs in platforms like GitLab.

## Highlights
- **GitLab Security**: Extensive research into CI/CD pipelines and repository-based attacks.
- **JavaScript Internals**: Analyzing prototype pollution and other framework-specific vulnerabilities.
- **Bug Bounty Methodology**: Insights into finding logic flaws that automated scanners miss.