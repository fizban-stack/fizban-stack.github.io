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

Unlike simple vulnerable APIs, crAPI provides a complex, realistic application with microservices architecture, making it ideal for practicing advanced API security testing techniques.

## Application Features

### User Features
- User registration and authentication
- Vehicle management
- Community forum
- Mechanic services booking
- Contact form
- Video uploads

### Architecture
- Microservices design
- Multiple API endpoints
- Database interactions
- File upload functionality
- Real-time features

## Covered Vulnerabilities

### OWASP API Security Top 10

1. **Broken Object Level Authorization**: Access other users' vehicles
2. **Broken User Authentication**: JWT vulnerabilities
3. **Excessive Data Exposure**: Information leakage in responses
4. **Lack of Rate Limiting**: API abuse possibilities
5. **Broken Function Level Authorization**: Admin endpoint access
6. **Mass Assignment**: Modify user properties
7. **Security Misconfiguration**: Various misconfigurations
8. **Injection**: Multiple injection points
9. **Improper Assets Management**: API versioning issues
10. **Insufficient Logging**: Detection gaps

### Additional Vulnerabilities
- Business logic flaws
- File upload vulnerabilities
- GraphQL security issues
- NoSQL injection
- SSRF (Server-Side Request Forgery)
- Sensitive data exposure

## Deployment

### Docker Compose (Recommended)
```bash
git clone https://github.com/OWASP/crAPI.git
cd crAPI
docker-compose -f deploy/docker/docker-compose.yml up -d
```

### Kubernetes
```bash
kubectl apply -f deploy/k8s/
```

## Challenge Categories

### Level 1: User Authentication
- Broken authentication
- JWT manipulation
- Session management

### Level 2: Authorization
- BOLA vulnerabilities
- Privilege escalation
- Horizontal authorization bypass

### Level 3: Data Exposure
- Excessive data in responses
- Information disclosure
- GraphQL introspection

### Level 4: Rate Limiting
- Brute force attacks
- Resource exhaustion
- API abuse

### Level 5: BFLA (Broken Function Level Authorization)
- Admin function access
- Hidden endpoint discovery
- API versioning issues

### Level 6: Mass Assignment
- Object property manipulation
- Price manipulation
- Role elevation

### Level 7: SSRF
- Internal network access
- Cloud metadata abuse
- URL validation bypass

### Level 8: Injection
- SQL injection
- NoSQL injection
- Command injection

## Testing Approach

1. **Reconnaissance**: Map all API endpoints
2. **Authentication**: Test login mechanisms
3. **Authorization**: Identify BOLA/BFLA issues
4. **Data Validation**: Test injection points
5. **Business Logic**: Explore workflow flaws
6. **Rate Limiting**: Test abuse scenarios

## Tools Integration

- **Burp Suite**: Full proxy support
- **Postman**: API collection available
- **OWASP ZAP**: Compatible scanner
- **Custom Scripts**: API for automation

## Learning Resources

- Built-in challenge system
- Detailed documentation
- Community solutions
- Video walkthroughs
- Blog posts and articles

## Use Cases

- **Advanced API Testing**: Practice complex scenarios
- **Bug Bounty**: Real-world patterns
- **Security Training**: Corporate training labs
- **Tool Development**: Test API security tools
- **Research**: Understand modern API risks

## What Makes crAPI Special

- **Realistic Application**: Full-featured car platform
- **Microservices**: Modern architecture
- **Complex Scenarios**: Multi-step attacks
- **Active Community**: Regular updates
- **Enterprise-Like**: Mirrors production environments

crAPI represents the gold standard for modern API security training, providing complexity and realism that mirrors actual production applications.
