---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Orange Tsai
focus: Seminal RCE chains and architectural quirks
category: Advanced Vulnerability Research
description: Rare but legendary posts that redefine what is possible in web exploitation and exploit chaining.
image: recommended-blogs/orange-tsai.webp
website: https://blog.orange.tw/
rss_feed: https://blog.orange.tw/feed.xml
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

## The Masterclass
Orange Tsai is famous for "The New Era of SSRF" and his work on Exchange Server (ProxyLogon). Every post is a lesson in **creative technical thinking**, showing how to turn a minor parser discrepancy into a full system compromise.