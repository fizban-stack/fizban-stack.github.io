---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Pixi
focus: MEAN stack API security and web services
type: Container
category: Web Applications
description: OWASP DevSlop's vulnerable photo-sharing application with wildly insecure APIs, demonstrating common API vulnerabilities in MEAN stack applications.
image: vulnerable-labs/pixi.webp
github: https://github.com/DevSlop/Pixi
website: https://github.com/DevSlop/Pixi
---

Pixi is a vulnerable photo-sharing application created by the OWASP DevSlop project, intentionally built with insecure APIs to demonstrate common security failures in MEAN stack applications.

## Overview

Created by the OWASP DevSlop team, Pixi is a deliberately vulnerable photo-sharing platform designed to help developers and security professionals learn about API security. While the module is no longer actively supported, it remains highly valuable as a testing platform because, as the developers note, "it's wildly vulnerable" and will "light up like a beautiful Christmas tree" when scanned with security tools.

## Technology Stack

- **MongoDB**: NoSQL database for data storage
- **Express.js**: Backend web application framework
- **Angular**: Frontend JavaScript framework
- **Node.js**: Server-side JavaScript runtime
- **Docker / Docker Compose**: Containerization and orchestration

## Getting Started

```bash
git clone https://github.com/DevSlop/Pixi.git
cd Pixi
docker-compose up -d

# Access at http://localhost:8000
```

## Vulnerability Categories

- Broken Object Level Authorization (BOLA) and IDOR
- Broken Authentication and JWT Issues
- Excessive Data Exposure in API Responses
- Missing Rate Limiting and Brute Force Protection
- Broken Function Level Authorization
- Mass Assignment and Parameter Pollution
- NoSQL Injection, XSS, and Command Injection
- CSRF via GET-based State Changes
- Missing CSRF Tokens and SameSite Cookie Attributes
- Security Misconfiguration and Debug Mode
- Insecure File Upload and Path Traversal
- Sensitive Data Exposure and Unencrypted Transmission

## Use Cases

- **API Security Training**: Hands-on API testing and OWASP API Security Top 10 practice
- **DAST Scanner Validation**: Test dynamic scanners and WAF rules against known vulnerabilities
- **Developer Training**: Learn secure MEAN stack coding practices
- **CTF Preparation**: Practice for web security competitions
- **WAF Testing**: Validate OWASP Core Rule Set and ModSecurity configurations
