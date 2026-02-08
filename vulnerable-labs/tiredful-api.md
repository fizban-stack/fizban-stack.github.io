---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Tiredful API
focus: REST API security and OWASP API Top 10
type: Container
category: API Security
description: Payatu Labs' intentionally vulnerable REST API demonstrating API security flaws including IDOR, SQL injection, XSS, broken authentication, and JWT vulnerabilities.
image: vulnerable-labs/tiredful-api.webp
github: https://github.com/payatu/Tiredful-API
website: https://github.com/payatu/Tiredful-API
---

Tiredful API is an intentionally vulnerable REST API created by Payatu Labs to teach developers, QA professionals, and security practitioners about common API security flaws resulting from insecure coding practices.

## Overview

Built on Django and Django REST Framework, Tiredful API provides a hands-on learning platform for understanding API security vulnerabilities. The project demonstrates realistic API security issues found in production environments, making it an excellent resource for both learning and tool testing.

## Key Features

- **Django REST Framework**: Modern Python API framework
- **RESTful Architecture**: Standard REST API patterns
- **SQLite Database**: Lightweight database with injection vulnerabilities
- **JWT Support**: Token-based authentication with flaws
- **Multiple Endpoints**: Diverse vulnerability scenarios
- **Docker Support**: Easy containerized deployment

## Technology Stack

- **Framework**: Django and Django REST Framework
- **Language**: Python 3
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker or local development server

## Deployment

```bash
# Docker (Recommended)
docker pull payatu/tiredful
docker run -p 8000:8000 payatu/tiredful

# Or from source
git clone https://github.com/payatu/Tiredful-API.git
cd Tiredful-API
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Vulnerability Categories

- **Broken Object Level Authorization (BOLA)**: IDOR, horizontal privilege escalation, parameter tampering
- **Broken Authentication**: Weak JWT implementation, missing token validation, credential stuffing
- **Excessive Data Exposure**: Unnecessary data in responses, verbose error messages, PII leakage
- **Lack of Rate Limiting**: Unlimited API requests, brute force possible, resource exhaustion
- **Broken Function Level Authorization**: Unprotected admin functions, role-based access bypass
- **Mass Assignment**: Modify restricted fields, privilege escalation via property binding
- **Security Misconfiguration**: Default configurations, debug mode, missing security headers
- **Injection**: SQL injection (SQLite), XSS in API responses, command injection
- **Improper Assets Management**: Deprecated endpoints, shadow APIs, documentation exposure
- **Insufficient Logging & Monitoring**: Missing audit logs, no alerting

## Use Cases

- **Security Training**: Hands-on API security testing practice
- **Developer Education**: Learn secure API coding practices
- **Tool Validation**: Test API security scanners
- **Certification Prep**: OSWE, BSCP preparation

