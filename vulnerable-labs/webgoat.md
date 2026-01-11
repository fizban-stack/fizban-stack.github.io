---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: OWASP WebGoat
focus: Java web security and OWASP Top 10
type: Container
category: Web Applications
description: OWASP's flagship deliberately insecure application teaching web security lessons through hands-on exercises covering injection, authentication, and cryptography.
image: vulnerable-labs/webgoat.webp
github: https://github.com/WebGoat/WebGoat
website: https://owasp.org/www-project-webgoat/
---

OWASP WebGoat is a deliberately insecure web application maintained by OWASP designed to teach web application security lessons. It provides a realistic teaching environment where users can learn about common web vulnerabilities.

## Overview

WebGoat has been teaching web security since the early 2000s. The current version (8.x) is built with Spring Boot and provides an interactive learning experience with lessons, hints, and solutions.

## Key Features

- **Interactive Lessons**: Step-by-step security tutorials
- **OWASP Top 10 Coverage**: Complete coverage of major vulnerabilities
- **Built-in Hints**: Progressive help system
- **Progress Tracking**: Monitor your learning journey
- **Modern Architecture**: Spring Boot with responsive UI
- **Standalone Application**: No external dependencies needed

## Deployment

```bash
# Docker (Recommended)
docker run -it -p 127.0.0.1:8080:8080 -p 127.0.0.1:9090:9090 \
  webgoat/webgoat

# Java JAR
java -jar webgoat-2023.8.jar

# Access at http://localhost:8080/WebGoat
```

## Lesson Categories

### General
- HTTP Basics
- HTTP Proxies
- Developer Tools
- CIA Triad

### Injection
- SQL Injection (Intro)
- SQL Injection (Advanced)
- SQL Injection (Mitigation)
- Path Traversal
- XXE (XML External Entities)

### Authentication
- Authentication Bypasses
- JWT Tokens
- Password Reset
- Secure Passwords

### Client-Side
- Bypass Front-end Restrictions
- HTML Tampering
- Client-Side Filtering
- DOM-Based XSS

### Cryptography
- Encoding vs Encryption
- Hashing
- Cryptographic Failures
- Signing

### Insecure Deserialization
- Object Serialization
- Insecure Deserialization Attacks

### Access Control
- Insecure Direct Object References (IDOR)
- Missing Function Level Access Control
- Spoofing Authentication Cookies

### Request Forgeries
- Cross-Site Request Forgery (CSRF)
- Server-Side Request Forgery (SSRF)

### Vulnerable Components
- Known Vulnerabilities
- Outdated Components

### Challenge Scenarios
- Multi-step challenges
- Real-world scenarios
- Advanced exploitation

## Learning Approach

### For Beginners
1. Start with General lessons
2. Learn HTTP basics and developer tools
3. Progress through Injection basics
4. Master authentication concepts

### For Intermediate
1. Advanced injection techniques
2. Complex access control scenarios
3. Cryptography implementation
4. Client-side security

### For Advanced
1. Challenge scenarios
2. Multi-stage attacks
3. Custom exploit development

## Use Cases

### Security Training
- Developer security awareness
- Secure coding practices
- Vulnerability identification

### Educational Settings
- University courses
- Boot camps
- Self-paced learning

### Professional Development
- Security team training
- Certification preparation (CEH, OSCP)
- Interview practice

## Companion Tool: WebWolf

WebWolf is a simulated attacker website that helps with certain lessons. It runs alongside WebGoat to facilitate exercises requiring an external malicious site.

```bash
# WebWolf runs automatically with WebGoat
# Access at http://localhost:9090/WebWolf
```

## Technical Details

- **Framework**: Spring Boot 3.x
- **Frontend**: Thymeleaf, jQuery, Bootstrap
- **Database**: H2 (in-memory)
- **Language**: Java 17+

## Best Practices

- Run locally or in isolated environments
- Never expose to the internet
- Use for learning, not as a honeypot
- Complete lessons sequentially
- Read the hints before solutions
- Experiment with different approaches

## Community and Support

- Active GitHub repository
- Regular updates and new lessons
- Community-contributed content
- Slack channel for questions
- Conference workshops

WebGoat remains one of the most effective tools for learning web application security fundamentals in a hands-on, practical way.
