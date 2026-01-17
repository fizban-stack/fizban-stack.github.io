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

## The Masterclass
Orange Tsai is famous for "The New Era of SSRF" and his work on Exchange Server (ProxyLogon). Every post is a lesson in **creative technical thinking**, showing how to turn a minor parser discrepancy into a full system compromise.

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

## Research Methodology

### Deep Protocol Analysis
Orange's approach includes:
- Reading RFC specifications thoroughly
- Comparing implementations across software
- Identifying parsing inconsistencies
- Testing edge cases systematically

### Variant Analysis
After discovering a vulnerability class:
- Testing across similar software
- Finding bypass techniques for patches
- Developing comprehensive exploitation

### Responsible Disclosure
Maintaining strong vendor relationships through:
- Detailed technical reports
- Coordination on patch development
- Appropriate disclosure timelines

## Notable Research

### ProxyLogon (CVE-2021-26855)
Groundbreaking Exchange Server research:
- Pre-authentication SSRF vulnerability
- Combined with post-auth arbitrary write
- Led to widespread exploitation
- Pwnie Award winner

### The New Era of SSRF
Foundational research that:
- Redefined SSRF attack surface
- Introduced new exploitation techniques
- Influenced cloud security practices

### SSL VPN Research
Multiple critical vulnerabilities in:
- Pulse Secure
- Fortinet FortiGate
- Palo Alto GlobalProtect

## Who Should Follow

### Vulnerability Researchers
Essential for understanding elite-level vulnerability discovery methodology.

### Enterprise Security Teams
Critical for understanding threats to corporate infrastructure.

### Penetration Testers
Advanced techniques for assessing enterprise environments.

### Bug Bounty Hunters
Inspiration for approaching high-value targets.

### Security Architects
Understanding attack patterns informs better design.

## Best Practices for Following

### Study Methodology
- Don't just read the exploit—understand the discovery process
- Note the research approach and testing methodology
- Consider how techniques apply to other software

### Practice Fundamentals
- Build strong protocol knowledge
- Understand parser implementation differences
- Learn to read source code and specifications

### Apply to Your Work
- Look for similar patterns in your targets
- Test edge cases and parsing inconsistencies
- Consider unexplored attack surfaces

## Recommended Posts

### Must-Read Research
1. **"A New Attack Surface on MS Exchange"** - The ProxyLogon vulnerability chain that changed enterprise security
2. **"The New Era of SSRF"** - Foundational research on modern SSRF exploitation techniques
3. **"Hacking Jenkins"** - Multiple vulnerabilities in popular CI/CD infrastructure
4. **"Breaking Parser Logic"** - URL parsing inconsistencies leading to security vulnerabilities
5. **"SSL VPN Security"** - Critical vulnerabilities in enterprise VPN appliances

### For Beginners
Start with "The New Era of SSRF" to understand the research methodology before tackling more complex chains.

### For Advanced Researchers
Study the ProxyLogon research for a masterclass in combining multiple vulnerabilities into a complete exploitation chain.

### Conference Talks
Orange's Black Hat and DEF CON presentations often contain additional details not in the blog posts.

Orange Tsai's blog represents the pinnacle of vulnerability research, demonstrating that patient, methodical analysis of complex systems can reveal critical security flaws that others miss.