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

## Key Topics
- **SaaS Tenancy**: Breaking isolation in multi-tenant environments.
- **Cloud Misconfigurations**: Exploiting AWS/GCP/Azure specific features.
- **Webhook Security**: Analyzing the "set and forget" vulnerabilities in modern integrations.

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

### Modern Application Security
- **Serverless Security**: Lambda, Cloud Functions, and Azure Functions
- **Container Vulnerabilities**: Docker and Kubernetes security
- **CI/CD Pipeline Attacks**: Build system compromise
- **Infrastructure as Code**: Terraform, CloudFormation issues

## Research Methodology

### Real-World Focus
Spaceraccoon's approach includes:
- Bug bounty program participation
- Production environment testing
- Practical exploitation demonstration
- Responsible disclosure

### Modern Stack Understanding
Deep knowledge of:
- Cloud provider architectures
- SaaS platform internals
- Integration patterns
- DevOps tooling

## Notable Research Areas

### SaaS Security Research
Analysis of vulnerabilities in:
- Enterprise collaboration tools
- Development platforms
- Marketing automation
- Business intelligence software

### Webhook Attack Surface
Comprehensive coverage of:
- Webhook authentication bypass
- SSRF through webhooks
- Callback URL manipulation
- Event injection attacks

## Who Should Follow

### Cloud Security Engineers
Essential for understanding modern cloud attack vectors.

### Bug Bounty Hunters
Practical techniques for SaaS and cloud targets.

### DevOps Engineers
Security awareness for CI/CD and infrastructure.

### Product Security Teams
Guidance for securing modern application architectures.

### SaaS Developers
Understanding vulnerabilities to build more secure products.

## Best Practices for Following

### Hands-On Practice
- Set up cloud lab environments
- Practice techniques safely
- Understand cloud provider specifics

### Stay Current
- Cloud platforms evolve rapidly
- New services create new attack surfaces
- Follow vendor security documentation

### Apply to Work
- Audit webhook implementations
- Review multi-tenant isolation
- Test cloud configurations

## Recommended Posts

### Must-Read Research
1. **"Exploiting Multi-Tenant SaaS Applications"** - Comprehensive guide to tenant isolation bypass techniques
2. **"Webhook Security: The Hidden Attack Surface"** - Analysis of common webhook vulnerabilities and exploitation
3. **"AWS IAM Privilege Escalation"** - Techniques for escalating privileges in AWS environments
4. **"GraphQL Security Research"** - Vulnerabilities in GraphQL API implementations
5. **"CI/CD Pipeline Attacks"** - Compromising software delivery through build systems

### For Cloud Security Beginners
Start with the AWS-specific posts to understand cloud security fundamentals.

### For Bug Bounty Hunters
Focus on the SaaS and webhook research for immediately applicable techniques.

### For Defenders
Study the attack patterns to improve detection and prevention capabilities.

Spaceraccoon's blog is essential reading for anyone working with or securing modern cloud-native applications, providing practical insights into the unique security challenges of SaaS and cloud architectures.