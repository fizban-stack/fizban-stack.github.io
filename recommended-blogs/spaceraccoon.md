---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Spaceraccoon
focus: Cloud-native security and SaaS exploitation
category: Modern Web Security
description: Focused research on modern SaaS stacks, cloud-native vulnerabilities, and creative bug bounty write-ups.
image: recommended-blogs/spaceraccoon.webp
website: https://spaceraccoon.dev/
rss_feed: https://spaceraccoon.dev/feed.xml
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

Spaceraccoon is a key resource for understanding **cloud-native attack surfaces**. Eugene's research into SaaS tenancy, webhook security, and supply chain attacks covers the vulnerabilities unique to modern, integration-heavy architectures.

---

## Recommended Posts

- [Universal Code Execution by Chaining Messages in Browser Extensions](https://spaceraccoon.dev/universal-code-execution-browser-extensions/) - Exploiting message-passing vulnerabilities between content scripts and native applications for full system compromise

- [Pwning Millions of Smart Weighing Machines with API and Hardware Hacking](https://spaceraccoon.dev/pwning-millions-smart-weighing-machines-api-hardware-hacking/) - SQL injection and device reassociation flaws affecting over a million IoT devices through API-level attacks

- [Exploiting Improper Validation of Amazon Simple Notification Service SigningCertUrl](https://spaceraccoon.dev/exploiting-improper-validation-amazon-simple-notification-service/) - Forging SNS messages by exploiting certificate URL validation flaws in AWS SDKs

- [Supply Chain Pollution: Hunting a 16 Million Download/Week npm Package Vulnerability](https://spaceraccoon.dev/supply-chain-pollution-hunting-a-16-million-download-week-npm-package/) - Discovering prototype pollution in the popular `ini` package through pattern matching and functionality grouping

- [Remote Code Execution in Three Acts: Chaining Exposed Actuators and H2 Database Aliases in Spring Boot 2](https://spaceraccoon.dev/remote-code-execution-in-three-acts-chaining-exposed-actuators-and-h2-database/) - RCE via exposed actuator endpoints and H2 database alias functionality

---

## Why Follow This Blog

Spaceraccoon (Eugene Lim) focuses on the security challenges unique to modern cloud-native architectures. His research addresses the vulnerabilities that emerge when organizations rapidly adopt SaaS platforms, serverless functions, and complex integrations without fully understanding the security implications.

## Key Topics Covered

### Multi-Tenant Security
- **Tenant Isolation Bypass**: Accessing other customers' data
- **Shared Resource Exploitation**: Exploiting common infrastructure
- **Cross-Tenant Attacks**: Moving between isolated environments
- **Data Leakage**: Unintended information disclosure

### Cloud Platform Security
- **AWS Exploitation**: IAM, S3, Lambda, and service-specific vulnerabilities
- **GCP Security**: Google Cloud Platform attack vectors
- **Azure Attacks**: Microsoft cloud service vulnerabilities
- **Multi-Cloud Issues**: Security gaps in hybrid environments

### API & Integration Security
- **Webhook Vulnerabilities**: SSRF, authentication bypass, and injection
- **OAuth Misconfigurations**: Authorization flow exploitation
- **GraphQL Security**: Query manipulation and information disclosure
- **REST API Flaws**: Endpoint security weaknesses

### Supply Chain & Application Security
- **npm/Package Attacks**: Dependency confusion and prototype pollution
- **Browser Extensions**: Message-passing and privilege escalation
- **CI/CD Pipeline Attacks**: Build system compromise
- **IoT Security**: Hardware and API-level exploitation
