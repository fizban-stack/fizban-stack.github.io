---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: jub0bs.com
focus: Security headers, Go security, and web defense
category: AppSec & Defensive Engineering
description: Expert analysis of security headers, Go (Golang) security practices, and robust web defense mechanisms.
image: recommended-blogs/jub0bs.webp
website: https://jub0bs.com/posts/
rss_feed: https://jub0bs.com/posts/index.xml
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

This blog is essential for hunters who want to understand **Defensive Bypass**. By learning the "correct" way to implement security headers and Go code, hunters can identify the subtle deviations that lead to vulnerabilities.

---

## Recommended Posts

- [A smorgasbord of a bug chain: postMessage, JSONP, WAF bypass, DOM-based XSS, CORS, CSRF](https://jub0bs.com/posts/2023-05-05-smorgasbord-of-a-bug-chain/) - Multi-vulnerability chain exploiting insecure message listener, JSONP, and permissive CORS to achieve CSRF

- [Scraping the bottom of the CORS barrel (part 1)](https://jub0bs.com/posts/2022-08-04-scraping-the-bottom-of-the-cors-barrel-part1/) - Advanced CORS testing techniques including resource-level testing, origin enumeration, and regexp exploitation

- [CVE-2022-21703: cross-origin request forgery against Grafana](https://jub0bs.com/posts/2022-02-08-cve-2022-21703-writeup/) - Exploiting weak content-type validation and SameSite cookie limitations for privilege escalation

- [Abusing Slack's file-sharing functionality to de-anonymise fellow workspace members](https://jub0bs.com/posts/2021-10-12-xsleak-stack/) - XSLeak technique bypassing SameSite cookies using CSP form-action directive

- [Leveraging an SSRF to leak a secret API key](https://jub0bs.com/posts/2020-06-23-ssrf/) - SSRF via URL authority bypass to intercept CoinMarketCap API credentials

---

## Why Follow This Blog

jub0bs (Julien Cretel) provides exceptionally detailed analysis of web security mechanisms that most resources only cover superficially. His deep expertise in security headers, CORS, and Go security makes this blog invaluable for both offensive and defensive security practitioners.

## Key Topics Covered

### Security Headers
- **CORS Implementation**: Cross-Origin Resource Sharing deep dives
- **Content-Security-Policy**: CSP configuration and bypass
- **HSTS**: HTTP Strict Transport Security analysis
- **X-Frame-Options**: Clickjacking protection mechanisms
- **Cookie Security**: Secure cookie configuration

### Go (Golang) Security
- **Secure Coding**: Go security best practices
- **Common Vulnerabilities**: Go-specific security issues
- **Library Security**: Evaluating Go security libraries
- **Web Framework Security**: Securing Go web applications

### Web Defense Mechanisms
- **Origin Validation**: Proper origin checking
- **CSRF Protection**: Cross-site request forgery defense
- **Input Validation**: Secure input handling
- **Output Encoding**: Preventing injection attacks

### Browser Security
- **Same-Origin Policy**: SOP mechanics and bypasses
- **Browser Isolation**: Security boundary analysis
- **Fetch Metadata**: Request context headers
- **Speculative Execution**: Browser timing attacks
