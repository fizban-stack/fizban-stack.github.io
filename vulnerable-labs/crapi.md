---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: crAPI
focus: Modern API hacking techniques
type: Container
category: API Security
description: Completely Ridiculous API by OWASP demonstrating modern API vulnerabilities in a car community platform with microservices architecture.
image: vulnerable-labs/crapi.webp
github: https://github.com/OWASP/crAPI
website: https://owasp.org/www-project-crapi/
---

crAPI (Completely Ridiculous API) is OWASP's modern vulnerable API application designed to demonstrate contemporary API security issues in a realistic car dealership and community platform.

## Overview

Unlike simple vulnerable APIs, crAPI provides a complex, realistic application with microservices architecture, making it ideal for practicing advanced API security testing techniques. The platform features user registration, vehicle management, a community forum, mechanic services booking, video uploads, and multiple API endpoints with database interactions and real-time features.

## Key Features

- **Microservices Architecture**: Realistic modern application design
- **OWASP API Security Top 10**: Complete coverage across structured challenge levels
- **Rich Feature Set**: Vehicle management, forum, mechanic booking, video uploads
- **Multiple Deployment Options**: Docker Compose and Kubernetes support
- **Built-in Challenge System**: Progressive difficulty levels guiding exploration
- **GraphQL and REST**: Multiple API paradigms with vulnerabilities

## Getting Started

```bash
git clone https://github.com/OWASP/crAPI.git
cd crAPI
docker-compose -f deploy/docker/docker-compose.yml up -d

# Or via Kubernetes
kubectl apply -f deploy/k8s/
```

## Vulnerability Categories

- Broken Object Level Authorization (BOLA)
- Broken User Authentication and JWT Vulnerabilities
- Excessive Data Exposure and Information Leakage
- Missing Rate Limiting and API Abuse
- Broken Function Level Authorization (BFLA)
- Mass Assignment (Price Manipulation, Role Elevation)
- Security Misconfiguration
- SQL Injection, NoSQL Injection, and Command Injection
- Improper Assets Management and API Versioning Issues
- Insufficient Logging and Detection Gaps
- Business Logic Flaws
- File Upload Vulnerabilities
- GraphQL Security Issues
- Server-Side Request Forgery (SSRF)

## Use Cases

- **Advanced API Testing**: Practice complex multi-step API attack scenarios
- **Bug Bounty Preparation**: Real-world API vulnerability patterns
- **Security Training**: Corporate training labs with structured challenges
- **Tool Development**: Test and validate API security tools
- **Research**: Understand modern API risks in microservices architectures
