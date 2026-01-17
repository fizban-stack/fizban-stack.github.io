---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: PortSwigger Research
focus: Novel web attack classes and HTTP protocol exploitation
category: Web Security Research
description: The definitive source for groundbreaking web vulnerability research, led by industry pioneers like James Kettle.
image: recommended-blogs/portswigger.webp
website: https://portswigger.net/research
rss_feed: https://portswigger.net/blog/rss
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

PortSwigger Research doesn't just find bugs; they define new classes of vulnerabilities. Their work fundamentally changes how the industry understands the relationship between web servers, proxies, and browsers.

## Notable Research Pillars

### Protocol Interference
- **HTTP Request Smuggling**: Evolution of desynchronization attacks.
- **H2C Smuggling**: Exploiting HTTP/2 cleartext upgrades.
- **Request Tunnelling**: Breaking through architectural boundaries.

### Cache & Architecture
- **Web Cache Poisoning**: Uncovering unkeyed inputs in global CDNs.
- **CPDoS**: Cache-based Denial of Service methodologies.

### Server-Side Exploitation
- **SSRF Reimagined**: Advanced techniques to hit internal metadata services.
- **Template Injection**: Discovering RCE in modern UI frameworks.

## 2026 Innovation
In 2026, PortSwigger has pivoted heavily into **Browser-Level Vulnerabilities** and **Advanced API Exploitation**, documenting how client-side state management can be weaponized against the backend.

## Why Follow This Blog

PortSwigger Research doesn't follow trends—they create them. When James Kettle publishes research on a new vulnerability class, it becomes required reading for the entire web security community. Their methodical approach to discovering architectural flaws in the web's foundational protocols provides a masterclass in creative security thinking.

## Key Topics Covered

### HTTP Desynchronization
- **Request Smuggling**: CL.TE, TE.CL, and TE.TE variants
- **HTTP/2 Downgrade Attacks**: Exploiting protocol translation
- **Browser-Powered Smuggling**: Client-side desync techniques
- **Response Queue Poisoning**: Corrupting server response handling

### Web Cache Attacks
- **Cache Poisoning**: Unkeyed input exploitation
- **Cache Deception**: Tricking caches into storing sensitive data
- **CDN Vulnerabilities**: Attacking global content delivery infrastructure
- **Cache Key Normalization**: Exploiting URL parsing differences

### Server-Side Attacks
- **SSRF Techniques**: Advanced server-side request forgery
- **Template Injection**: RCE through template engines
- **Prototype Pollution**: JavaScript object manipulation
- **Parameter Pollution**: Exploiting parser inconsistencies

### Client-Side Research
- **DOM Vulnerabilities**: Advanced DOM-based attack vectors
- **Postmessage Exploitation**: Cross-origin communication attacks
- **Browser Parsing Quirks**: Exploiting browser-specific behaviors

## Research Methodology

### Systematic Discovery
PortSwigger's approach includes:
- Deep protocol specification analysis
- Cross-implementation behavioral testing
- Edge case identification and exploitation
- Responsible disclosure with full technical writeups

### Tool Development
Research often produces:
- Burp Suite extensions
- Detection techniques
- Proof-of-concept tools
- Community resources

## Who Should Follow

### Web Security Researchers
Essential for understanding cutting-edge attack techniques and methodology.

### Penetration Testers
Practical techniques directly applicable to web application assessments.

### Bug Bounty Hunters
Novel vulnerability classes that can be applied across programs.

### Security Engineers
Understanding attacks is crucial for building effective defenses.

### Application Developers
Awareness of attack vectors leads to more secure code.

## Best Practices for Following

### Deep Reading
- Study the methodology, not just the exploit
- Understand the root cause of each vulnerability class
- Practice techniques in PortSwigger Web Security Academy

### Practical Application
- Test techniques in authorized environments
- Build detection rules based on findings
- Contribute to the research community

## Recommended Posts

### Must-Read Research
1. **"HTTP Request Smuggling"** - The foundational research that revived this vulnerability class and introduced modern detection techniques
2. **"Web Cache Poisoning"** - Groundbreaking research on exploiting unkeyed inputs in CDN infrastructure
3. **"HTTP/2: The Sequel is Always Worse"** - Advanced HTTP/2 desynchronization attacks
4. **"Browser-Powered Desync Attacks"** - Client-side request smuggling techniques
5. **"Server-Side Prototype Pollution"** - Extending prototype pollution to server-side JavaScript

### For Beginners
Start with the Web Security Academy companion materials before diving into the advanced research papers.

### For Practitioners
Focus on the practical detection and exploitation sections that include Burp Suite integration.

PortSwigger Research represents the gold standard for web security research, consistently discovering vulnerability classes that reshape how we think about web application security.