---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Info-sec Writeups
focus: Practical bug bounty reports and community knowledge
category: Community Bug Bounty
description: A curated collection of real-world bug bounty write-ups, offering actionable insights for active hunters.
image: recommended-blogs/infosec-writeups.webp
website: https://infosecwriteups.com/
rss_feed: https://medium.com/feed/bugbountywriteup/tagged/bug-bounty
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

Info-sec Writeups on Medium is the central nervous system for the bug bounty community, hosting a massive archive of successful vulnerability reports.

## Key Topics Covered
- **Web Vulnerability Write-ups**: IDOR, SQLi, and XSS in modern frameworks.
- **Reconnaissance Methodology**: How elite hunters map attack surfaces.
- **Tool Automation**: Guides on using and scripting tools like Nuclei, FFuf, and Burp Suite.
- **Program Reviews**: Insights into the response times and bounty structures of major companies.