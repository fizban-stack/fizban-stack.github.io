---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: The Citizen Lab
focus: Surveillance technology and human rights
category: Cyber-Espionage Research
description: Foremost research into state-sponsored spyware and its impact on global civil society.
image: recommended-blogs/citizen-lab.webp
website: https://citizenlab.ca/
rss_feed: https://citizenlab.ca/feed/
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

The Citizen Lab is the world leader in identifying and documenting the use of commercial spyware against non-combatants.

## Impact Research
- **Spyware Forensics**: Analyzing Pegasus and similar zero-click mobile exploits.
- **Digital Surveillance**: Mapping the infrastructure of global surveillance companies.
- **Policy & Ethics**: Researching the legal and ethical implications of the global spyware trade.