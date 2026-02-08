---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Praetorian Security
focus: Offensive security research and cryptography
category: Security Engineering
description: Advanced research into software security, cryptography, and complex system exploitation.
image: recommended-blogs/praetorian.webp
website: https://www.praetorian.com/blog/
rss_feed: https://www.praetorian.com/blog/feed/
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

Praetorian combines engineering rigor with offensive research to solve complex security problems.

---

## Recommended Posts

- [Exploiting LLM Write Primitives: System Prompt Extraction When Chat Output Is Locked Down](https://www.praetorian.com/blog/exploiting-llm-write-primitives-system-prompt-extraction-when-chat-output-is-locked-down/) - Research demonstrating how to extract system prompts from intent-based LLM assistants with locked-down chat interfaces by exploiting form field population as a write primitive

- [Where AI Systems Leak Data: A Lifecycle Review of Real Exposure Paths](https://www.praetorian.com/blog/where-ai-systems-leak-data-a-lifecycle-review-of-real-exposure-paths/) - Analysis of how sensitive data moves through retrieval, reasoning, and storage layers in AI systems without enforced trust boundaries, leading to unintentional exposure

- [Critical Advisory: Remote Code Execution in Next.js (CVE-2025-66478) with Working Exploit](https://www.praetorian.com/blog/critical-advisory-remote-code-execution-in-next-js-cve-2025-66478-with-working-exploit/) - Alert and PoC for a critical RCE in Next.js App Router caused by an upstream React Server Components prototype pollution vulnerability (CVE-2025-55182)

- [CVE-2025-52493: When Password Fields Aren't Enough – Client-Side Secret Exposure in PagerDuty Cloud Runbook](https://www.praetorian.com/blog/cve-2025-52493-when-password-fieldsarent-enough-client-side-secretexposure-in-pagerduty-cloud-runbook/) - Details a vulnerability where administrative secrets were sent to the client-side in cleartext and merely masked by password input fields, allowing retrieval via DOM manipulation

- [How I Found the Worst ASP.NET Vulnerability — A $10K Bug (CVE-2025-55315)](https://www.praetorian.com/blog/how-i-found-the-worst-asp-net-vulnerability-a-10k-bug-cve-2025-55315/) - Discovery of a critical HTTP request smuggling vulnerability in ASP.NET Core's Kestrel server due to inconsistent parsing of chunk extensions

- [Domain Fronting is Dead. Long Live Domain Fronting!](https://www.praetorian.com/blog/domain-fronting-is-dead-long-live-domain-fronting/) - New technique for performing domain fronting against Google-hosted infrastructure (App Engine, Cloud Run) to tunnel traffic through trusted services

- [OAuthSeeker: Leveraging OAuth Phishing for Initial Access and Lateral Movement on Red Team Engagements](https://www.praetorian.com/blog/oauthseeker-leveraging-oauth-phishing-for-initial-access-and-lateral-movement-on-red-team-engagements/) - Release of OAuthSeeker, a tool for red teams to leverage malicious OAuth applications for initial access and lateral movement in Microsoft environments

- [Ghost Calls: Abusing Web Conferencing for Covert Command & Control (Part 2 of 2)](https://www.praetorian.com/blog/ghost-calls-abusing-web-conferencing-for-covert-command-control-part-2-of-2/) - Technical deep dive into tunneling C2 traffic through Zoom and Microsoft Teams using their TURN infrastructure to evade detection

---

## Why Follow This Blog

Praetorian brings a unique engineering-first approach to offensive security. Their team combines deep technical expertise with a focus on building scalable security solutions, producing research that's both technically rigorous and practically applicable.

## Key Topics Covered

### Cloud Security
- **AWS Security**: Amazon Web Services exploitation and defense
- **Azure Assessment**: Microsoft cloud security research
- **GCP Security**: Google Cloud Platform vulnerabilities
- **Multi-Cloud**: Cross-provider security challenges

### Cryptographic Security
- **Implementation Flaws**: Real-world crypto vulnerabilities
- **Protocol Analysis**: Cryptographic protocol weaknesses
- **Key Management**: Secure key handling practices
- **Side Channels**: Timing and other implementation attacks

### Offensive Research
- **Vulnerability Discovery**: Finding novel security flaws
- **Exploitation Techniques**: Advanced attack development
- **Red Team Operations**: Enterprise attack simulation
- **Tool Development**: Building security assessment tools

### Security Engineering
- **DevSecOps**: Integrating security into development
- **Automation**: Scaling security assessments
- **Product Security**: Code review and architecture analysis
- **Threat Modeling**: Comprehensive risk assessment
