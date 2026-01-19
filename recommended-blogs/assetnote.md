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

---

Assetnote is world-renowned for their ability to find critical zero-day vulnerabilities in enterprise-grade software. Their blog is a masterclass in attacking the "unattackable" infrastructure that powers the Fortune 500.

---

## Recommended Posts

- [Doing the Due Diligence: Analyzing the Next.js Middleware Bypass](https://www.assetnote.io/resources/research/doing-the-due-diligence-analyzing-the-next-js-middleware-bypass-cve-2025-29927): Deep technical analysis of the Next.js middleware bypass vulnerability CVE-2025-29927.

- [Nginx/Apache Path Confusion to Auth Bypass in PAN-OS](https://www.assetnote.io/resources/research/nginx-apache-path-confusion-to-auth-bypass-in-pan-os): Exploitation of path confusion vulnerabilities leading to authentication bypass in Palo Alto Networks PAN-OS.

- [How an obscure PHP footgun led to RCE in Craft CMS](https://www.assetnote.io/resources/research/how-an-obscure-php-footgun-led-to-rce-in-craft-cms): Reverse engineering and exploitation of PHP-specific vulnerabilities in Craft CMS.

- [Advisory: Next.js SSRF (CVE-2024-34351)](https://www.assetnote.io/resources/research/advisory-next-js-ssrf-cve-2024-34351): Server-side request forgery vulnerability in Next.js applications.

- [Citrix Denial of Service: Analysis of CVE-2024-8534](https://www.assetnote.io/resources/research/citrix-denial-of-service-analysis-of-cve-2024-8534): Technical breakdown of Citrix vulnerability and exploitation techniques.

---

## Research Highlights

### Enterprise Zero-Days
- **Jira & Confluence**: Chaining complex logic flaws into RCE.
- **F5 & Ivanti**: Analyzing critical vulnerabilities in networking appliances.
- **SAML & Auth**: Breaking enterprise identity providers.

### Attack Surface Mapping
- **Kube-Hunter**: Exploiting misconfigured Kubernetes clusters.
- **Subdomain Takeovers**: Novel vectors in modern cloud environments.

## Why Follow This Blog

Assetnote's unique position—combining attack surface management product development with active security research—produces insights that bridge the gap between theoretical vulnerabilities and real-world exploitation. Their research consistently identifies critical flaws in the enterprise software that organizations assume is secure.

## Key Topics Covered

### Enterprise Application Security
- **Atlassian Products**: Jira, Confluence, Bitbucket vulnerabilities
- **ServiceNow**: IT service management platform security
- **SAP Systems**: Enterprise resource planning exploitation
- **Oracle Applications**: Database and application server vulnerabilities
- **Microsoft Products**: Exchange, SharePoint, and enterprise suite

### Authentication & Identity
- **SAML Exploitation**: Single sign-on vulnerability research
- **OAuth Attacks**: Authorization framework flaws
- **LDAP Injection**: Directory service vulnerabilities
- **Kerberos**: Windows authentication attacks
- **SSO Bypass**: Enterprise identity provider weaknesses

### Network Infrastructure
- **Load Balancers**: F5, Citrix, and traffic management devices
- **VPN Appliances**: Remote access infrastructure security
- **Firewalls**: Next-generation firewall vulnerabilities
- **API Gateways**: Application delivery controller flaws

### Cloud & Container Security
- **Kubernetes**: Cluster misconfiguration and exploitation
- **Container Escapes**: Breaking container isolation
- **Cloud Metadata**: Instance metadata service attacks
- **Serverless**: Function-as-a-service security issues

### Attack Surface Discovery
- **Subdomain Enumeration**: Finding forgotten assets
- **Service Discovery**: Identifying exposed applications
- **Technology Fingerprinting**: Understanding target stacks
- **Vulnerability Correlation**: Mapping exposure to exploitability

## Research Methodology

### Attack Surface Perspective
Assetnote's approach starts with:
- Understanding what's exposed
- Mapping technology stacks
- Identifying high-value targets
- Prioritizing based on exploitability

### Deep Technical Analysis
Research includes:
- Source code review where possible
- Binary reverse engineering
- Protocol analysis
- Patch diffing

### Responsible Disclosure
Maintaining vendor relationships through:
- Coordinated disclosure timelines
- Detailed technical reports
- Collaboration on fixes

## Notable Research

### Atlassian Vulnerabilities
Multiple critical findings:
- Pre-authentication RCE chains
- Template injection vulnerabilities
- Authentication bypass techniques
- Data exposure issues

### Network Appliance Research
Critical discoveries in:
- F5 BIG-IP exploitation
- Ivanti/Pulse Secure vulnerabilities
- Citrix ADC attacks
- Load balancer security

## Who Should Follow

### Enterprise Security Teams
Critical for understanding threats to corporate infrastructure.

### Vulnerability Researchers
Methodology for approaching complex enterprise targets.

### Bug Bounty Hunters
Techniques applicable to high-value enterprise programs.

### Penetration Testers
Practical exploitation for enterprise assessments.

### Attack Surface Management Teams
Understanding what makes assets vulnerable.

## Best Practices for Following

### Inventory Awareness
- Know what enterprise software you run
- Track vulnerable versions
- Monitor for new research

### Rapid Response
- Assess exposure when new research drops
- Prioritize patching for critical findings
- Implement mitigations where patches unavailable

### Learn Methodology
- Study how vulnerabilities are discovered
- Understand attack surface mapping
- Apply techniques to your environment

## Recommended Posts

### Must-Read Research
1. **"Confluence Pre-Auth RCE Chain"** - Multiple vulnerabilities combined for unauthenticated remote code execution
2. **"F5 BIG-IP Exploitation"** - Critical load balancer vulnerabilities with widespread impact
3. **"SAML Implementation Vulnerabilities"** - Common flaws in enterprise SSO implementations
4. **"Jira Service Desk Exploitation"** - Attacking IT service management platforms
5. **"Kubernetes Attack Surface"** - Comprehensive analysis of container orchestration security

### For Enterprise Defenders
Prioritize posts about software in your environment for immediate security assessment.

### For Researchers
Study the attack surface mapping methodology before diving into specific exploits.

### For Bug Bounty Hunters
Focus on the authentication and authorization research for widely-applicable techniques.

Assetnote's blog demonstrates that even the most trusted enterprise software contains critical vulnerabilities waiting to be discovered, making it essential reading for anyone responsible for securing corporate infrastructure.