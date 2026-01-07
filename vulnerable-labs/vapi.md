---
layout: vulnerable-lab
title: vAPI
focus: API security testing and OWASP API Top 10
type: Container
category: API Security
description: Vulnerable Adversely Programmed Interface with realistic scenarios based on OWASP API Security Top 10 for practicing API penetration testing.
image: vulnerable-labs/vapi.webp
github: https://github.com/roottusk/vapi
website: https://github.com/roottusk/vapi
---

vAPI (Vulnerable Adversely Programmed Interface) is a self-hostable vulnerable API built with PHP and MySQL, designed for practicing API penetration testing with realistic business scenarios.

## Overview

Created by roottusk, vAPI provides a comprehensive API security testing environment with focus on realistic business logic vulnerabilities and OWASP API Security Top 10.

## Technology Stack

- **Backend**: PHP
- **Database**: MySQL
- **API Type**: RESTful
- **Authentication**: Token-based

## Application Context

vAPI simulates a mobile-like API for an e-commerce platform, providing realistic business scenarios:

- User management
- Product catalog
- Shopping cart
- Order processing
- Inventory system
- Payment handling (simulated)

## Covered Vulnerabilities

### OWASP API Security Top 10

1. **Broken Object Level Authorization**:
   - Access other users' orders
   - View unauthorized user profiles
   - Manipulate others' cart items

2. **Broken User Authentication**:
   - Weak password policies
   - JWT vulnerabilities
   - Session management issues
   - Token leakage

3. **Excessive Data Exposure**:
   - Verbose error messages
   - Unnecessary data in responses
   - Information disclosure
   - PII exposure

4. **Lack of Resources & Rate Limiting**:
   - No rate limiting
   - Resource exhaustion
   - Brute force opportunities
   - API abuse scenarios

5. **Broken Function Level Authorization**:
   - Admin endpoint access
   - Privilege escalation
   - Function-level bypass

6. **Mass Assignment**:
   - Modify admin status
   - Price manipulation
   - Discount abuse
   - Role elevation

7. **Security Misconfiguration**:
   - Default credentials
   - Verbose errors
   - Debug mode
   - Information leakage

8. **Injection**:
   - SQL injection
   - Command injection
   - LDAP injection
   - NoSQL injection

9. **Improper Assets Management**:
   - Legacy API versions
   - Deprecated endpoints
   - Undocumented APIs

10. **Insufficient Logging & Monitoring**:
   - Missing audit logs
   - No attack detection
   - Insufficient monitoring

## Additional Vulnerabilities

- **Business Logic Flaws**:
  - Price manipulation
  - Inventory bypass
  - Discount abuse
  - Order manipulation

- **IDOR (Insecure Direct Object References)**:
  - User data access
  - Order information
  - Payment details

- **SSRF (Server-Side Request Forgery)**:
  - Internal service access
  - Port scanning
  - Cloud metadata access

## Deployment

```bash
# Docker (Recommended)
git clone https://github.com/roottusk/vapi.git
cd vapi
docker-compose up -d

# Access at http://localhost/vapi
```

## API Endpoints

The API includes endpoints for:
- User registration and authentication
- User profile management
- Product browsing and search
- Shopping cart operations
- Order creation and management
- Payment processing
- Admin functions

## Testing Workflow

1. **Setup**: Deploy and access API documentation
2. **Reconnaissance**: Map all endpoints
3. **Authentication**: Test login mechanisms
4. **Authorization**: Test BOLA/BFLA
5. **Injection**: Test input validation
6. **Business Logic**: Explore workflow flaws
7. **Rate Limiting**: Test abuse scenarios

## Testing Tools

Compatible with:
- Burp Suite (with API analysis extensions)
- Postman/Insomnia
- OWASP ZAP
- curl/HTTPie
- Custom Python/JavaScript scripts

## Learning Resources

- Detailed README documentation
- Endpoint documentation
- Vulnerability hints
- Example exploit scenarios
- Community writeups

## Use Cases

- **API Penetration Testing Practice**: Real-world scenarios
- **Bug Bounty Preparation**: Common API patterns
- **Security Training**: Corporate workshops
- **Tool Development**: Test API security scanners
- **Certification Prep**: OSWE, BSCP, etc.

## Difficulty Levels

- **Beginner**: Basic authentication and authorization
- **Intermediate**: Injection and mass assignment
- **Advanced**: Complex business logic flaws
- **Expert**: Chaining multiple vulnerabilities

## What Makes vAPI Unique

- **Business Context**: E-commerce platform simulation
- **Realistic Scenarios**: Real-world business logic
- **PHP/MySQL Stack**: Common production stack
- **Self-Contained**: Easy deployment
- **Active Community**: Regular updates

vAPI provides an excellent middle ground between simple vulnerable APIs and complex platforms like crAPI, offering realistic business scenarios in an accessible format.
