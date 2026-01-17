---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Assetnote Blog
focus: Attack surface management and zero-day research
category: Offensive Security
description: Sophisticated research on enterprise software vulnerabilities and modern attack surface mapping.
image: recommended-blogs/assetnote.webp
website: https://blog.assetnote.io/
rss_feed: https://blog.assetnote.io/feed.xml
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

Assetnote is world-renowned for their ability to find critical zero-day vulnerabilities in enterprise-grade software. Their blog is a masterclass in attacking the "unattackable" infrastructure that powers the Fortune 500.

## Research Highlights

### Enterprise Zero-Days
- **Jira & Confluence**: Chaining complex logic flaws into RCE.
- **F5 & Ivanti**: Analyzing critical vulnerabilities in networking appliances.
- **SAML & Auth**: Breaking enterprise identity providers.

### Attack Surface Mapping
- **Kube-Hunter**: Exploiting misconfigured Kubernetes clusters.
- **Subdomain Takeovers**: Novel vectors in modern cloud environments.