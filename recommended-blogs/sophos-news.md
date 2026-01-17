---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Sophos News
focus: Managed response and cyber threat research
category: Defensive Security
description: Detailed analysis of real-world attacks and the defensive strategies used to combat them.
image: recommended-blogs/sophos.webp
website: https://news.sophos.com/
rss_feed: https://www.sophos.com/en-us/blog/feed
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

Sophos News provides "boots-on-the-ground" data from incident response engagements.

## Highlights
- **Active Adversary Reports**: Analyzing how attackers move laterally through modern networks.
- **MDR Insights**: Lessons learned from managing security for thousands of organizations.
- **Endpoint Security**: Research into bypassing and improving EDR solutions.