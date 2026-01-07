---
layout: vulnerable-lab
title: Tiredful API
focus: REST API vulnerabilities
type: Container
category: API Security
description: A vulnerable REST API for learning about API security issues including broken authentication, excessive data exposure, and injection vulnerabilities.
image: vulnerable-labs/tiredfulapi.webp
github: https://github.com/payatu/Tiredful-API
website: https://github.com/payatu/Tiredful-API
---

Tiredful API is an intentionally vulnerable REST API created by Payatu Labs for learning and practicing API security testing.

## Overview

This project focuses specifically on API security vulnerabilities, covering the OWASP API Security Top 10 and common REST API issues.

## OWASP API Security Top 10

1. **Broken Object Level Authorization**: IDOR vulnerabilities
2. **Broken User Authentication**: Weak auth mechanisms
3. **Excessive Data Exposure**: Over-sharing of information
4. **Lack of Resources & Rate Limiting**: DoS vulnerabilities
5. **Broken Function Level Authorization**: Missing access controls
6. **Mass Assignment**: Parameter pollution
7. **Security Misconfiguration**: Default configs, verbose errors
8. **Injection**: SQL, NoSQL, Command injection
9. **Improper Assets Management**: Unversioned APIs
10. **Insufficient Logging & Monitoring**: Lack of audit trails

## Key Features

- RESTful API architecture
- Multiple endpoints with different vulnerabilities
- Real-world API patterns
- JSON-based communication
- JWT authentication flaws

## Deployment

```bash
docker pull payatu/tiredful
docker run -p 8000:8000 payatu/tiredful
```

## Testing Tools

Compatible with:
- Burp Suite
- Postman
- OWASP ZAP
- curl
- Custom scripts

## Use Cases

- API security testing training
- Bug bounty preparation
- Security tool validation
- API pentesting practice
- Developer security awareness

Essential for anyone involved in API development or security testing of RESTful services.
