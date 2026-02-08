---
layout: detail-page
back_url: /recommended-blogs
back_text: Back to Recommended Blogs
breadcrumb_url: /recommended-blogs
breadcrumb_text: Recommended Blogs
title: Rhino Security Labs
focus: AWS/Cloud security and penetration testing tools
category: Cloud Offensive Security
description: A premier source for AWS security research, post-exploitation techniques, and offensive cloud tooling.
image: recommended-blogs/rhino-security.webp
website: https://rhinosecuritylabs.com/blog/
rss_feed: https://rhinosecuritylabs.com/feed/
---

## Subscribe
**RSS Feed:** [{{ page.rss_feed }}]({{ page.rss_feed }})

---

Rhino Security Labs is essential for understanding **Cloud Post-Exploitation**. They provide the scripts and methodologies to turn a single leaked IAM key into full cloud environment dominance.

---

## Recommended Posts

- [Multiple CVEs in Infoblox NetMRI: RCE, Auth Bypass, SQLi, and File Read Vulnerabilities](https://rhinosecuritylabs.com/research/infoblox-multiple-cves/) - Discovery of six vulnerabilities in Infoblox NetMRI including unauthenticated command injection and SQL injection leading to full appliance compromise

- [CVE-2025-26147: Authenticated RCE In Denodo Scheduler](https://rhinosecuritylabs.com/research/cve-2025-26147-authenticated-rce-in-denodo/) - Technical analysis of a path traversal vulnerability in Keytab file uploads allowing arbitrary file write and subsequent RCE via JSP web shell

- [CVE-2025-0693: AWS IAM User Enumeration](https://rhinosecuritylabs.com/research/unauthenticated-username-enumeration-in-aws/) - Identification of timing-based username enumeration flaws in the AWS Console login flow for users without MFA enabled

- [CVE-2024-55963: Unauthenticated RCE in Default-Install of Appsmith](https://rhinosecuritylabs.com/research/cve-2024-55963-unauthenticated-rce-in-appsmith/) - Exploiting a misconfigured default PostgreSQL instance in Appsmith to achieve unauthenticated remote code execution via SQL queries

- [Referral Beware, Your Rewards are Mine (Part 1)](https://rhinosecuritylabs.com/research/referral-beware-your-rewards-are-mine-part-1/) - Research into logic flaws within referral reward programs, detailing attacks like cookie injection, CRLF injection, and referral hijacking

---

## Why Follow This Blog

Rhino Security Labs has established itself as a leading voice in cloud security research, particularly for AWS. Their development of Pacu (the AWS exploitation framework) and consistent publication of cloud attack techniques makes their blog essential for anyone working in cloud security.

## Key Topics Covered

### AWS Security
- **IAM Exploitation**: Permission enumeration and escalation
- **S3 Security**: Bucket misconfiguration and data exposure
- **Lambda Attacks**: Serverless function exploitation
- **EC2 Security**: Instance metadata and SSRF attacks
- **Cross-Account Access**: Pivoting between AWS accounts

### Cloud Post-Exploitation
- **Privilege Escalation**: Elevating cloud permissions
- **Persistence**: Maintaining access in cloud environments
- **Lateral Movement**: Moving between cloud services
- **Data Exfiltration**: Extracting sensitive cloud data
- **Defense Evasion**: Avoiding cloud security detection

### Offensive Cloud Tools
- **Pacu**: AWS exploitation framework development
- **CloudGoat**: Vulnerable AWS deployment for training
- **Automation**: Scripting cloud attacks
- **Custom Tooling**: Building cloud security tools

### Multi-Cloud Security
- **Azure Security**: Microsoft cloud attack techniques
- **GCP Security**: Google Cloud Platform vulnerabilities
- **Cross-Cloud**: Multi-provider attack scenarios
- **Kubernetes**: Container orchestration security
