---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: th4ntis blog
focus: Red Teaming, Windows internals, and EDR evasion
category: Offensive Operations
description: Technical research into modern offensive operations, specializing in Windows and Active Directory.
image: recommended-blogs/th4ntis.webp
website: https://th4ntis.com/
rss_feed: https://th4ntis.com/feed.xml
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

th4ntis provides deep technical insights for red teamers and offensive security professionals.

## Technical Depth
- **Active Directory Exploitation**: Advanced techniques for abusing AD and ADCS.
- **EDR Evasion**: Developing custom payloads and syscall-based evasion techniques.
- **Initial Access**: Crafting effective phishing and delivery mechanisms in 2026.