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

---

Orange Tsai is famous for "The New Era of SSRF" and his work on Exchange Server (ProxyLogon). Every post is a lesson in **creative technical thinking**, showing how to turn a minor parser discrepancy into a full system compromise.

---

## Recommended Posts

- [The Art of PHP — My CTF Journey and Untold Stories!](https://blog.orange.tw/posts/2025-08-the-art-of-php-en/): Comprehensive PHP security research and CTF insights.

- [WorstFit: Unveiling Hidden Transformers in Windows ANSI!](https://blog.orange.tw/posts/2025-01-worstfit-unveiling-hidden-transformers-in-windows-ansi/): Novel Windows ANSI exploitation techniques.

- [Confusion Attacks: Exploiting Hidden Semantic Ambiguity in Apache HTTP Server!](https://blog.orange.tw/posts/2024-08-confusion-attacks-en/): Groundbreaking Apache path confusion research.

- [CVE-2024-4577 - Yet Another PHP RCE: Make PHP-CGI Argument Injection Great Again!](https://blog.orange.tw/posts/2024-06-cve-2024-4577-yet-another-php-rce/): Critical PHP vulnerability analysis.

---

## Why Follow This Blog

Orange Tsai publishes infrequently, but when he does, the security industry pays attention. His research consistently reveals fundamental flaws in widely-deployed enterprise software, and his methodology for discovering these vulnerabilities has influenced an entire generation of security researchers. Each post represents months or years of deep research compressed into a masterclass on exploitation.

## Key Topics Covered

### Server-Side Request Forgery (SSRF)
- **Protocol Smuggling**: Exploiting URL parser inconsistencies
- **Gopher Protocol Abuse**: Leveraging legacy protocols for exploitation
- **Cloud Metadata Services**: Targeting AWS, GCP, Azure metadata endpoints
- **Internal Service Access**: Pivoting through SSRF to internal systems
- **Filter Bypass Techniques**: Circumventing SSRF protections

### Enterprise Software Exploitation
- **Microsoft Exchange**: ProxyLogon, ProxyShell, and related vulnerabilities
- **Corporate Gateways**: Exploiting VPNs and network appliances
- **Java Applications**: Deserialization and expression language injection
- **Web Servers**: Apache, Nginx, and IIS parsing quirks

### Exploit Chain Development
- **Pre-Auth to RCE**: Building complete exploitation chains
- **Privilege Escalation**: Moving from low-privilege to system access
- **Multi-Stage Exploitation**: Combining multiple vulnerabilities
- **Bypass Techniques**: Defeating security controls and patches

### Web Application Security
- **URL Parsing Vulnerabilities**: Inconsistencies between parsers
- **Request Smuggling**: HTTP desynchronization attacks
- **Authentication Bypass**: Circumventing access controls
- **Template Injection**: Server-side template exploitation
