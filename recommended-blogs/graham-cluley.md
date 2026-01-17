---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Graham Cluley
focus: Security news, privacy, and social engineering
category: Security News & Opinion
description: Veteran security news and opinion from one of the industry's most respected voices.
image: recommended-blogs/cluley.webp
website: https://grahamcluley.com/writing/
rss_feed: https://grahamcluley.com/feed/
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

Graham Cluley provides an accessible yet deeply informed perspective on the latest security breaches and privacy scandals.

## Key Topics
- **Cybercrime Trends**: Analysis of major hacks and data breaches.
- **Social Engineering**: How attackers manipulate human behavior.
- **Privacy Scandals**: Reporting on corporate and government surveillance.