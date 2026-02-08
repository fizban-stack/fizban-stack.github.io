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

WebGoat has been teaching web security since the early 2000s. The current version (8.x) is built with Spring Boot and provides an interactive learning experience with step-by-step lessons, progressive hints, and solutions. It includes a companion tool called WebWolf that simulates an attacker website for exercises requiring an external malicious site.

## Key Features

- **Interactive Lessons**: Step-by-step security tutorials with progressive hints
- **OWASP Top 10 Coverage**: Complete coverage of major vulnerability categories
- **Progress Tracking**: Monitor your learning journey through all lessons
- **Standalone Application**: No external dependencies needed
- **WebWolf Companion**: Built-in attacker simulation tool
- **Modern Architecture**: Spring Boot 3.x with Java 17+, H2 in-memory database

## Getting Started

```bash
# Docker (Recommended)
docker run -it -p 127.0.0.1:8080:8080 -p 127.0.0.1:9090:9090 \
  webgoat/webgoat

# Access WebGoat at http://localhost:8080/WebGoat
# Access WebWolf at http://localhost:9090/WebWolf
```

## Vulnerability Categories

- SQL Injection (Intro, Advanced, Mitigation)
- Path Traversal
- XXE (XML External Entities)
- Authentication Bypasses and Password Reset Flaws
- JWT Token Vulnerabilities
- Client-Side Filtering and DOM-Based XSS
- HTML Tampering and Front-end Restriction Bypass
- Cryptographic Failures (Encoding, Hashing, Signing)
- Insecure Deserialization
- IDOR and Missing Function Level Access Control
- Cross-Site Request Forgery (CSRF)
- Server-Side Request Forgery (SSRF)
- Vulnerable and Outdated Components

## Use Cases

- **Developer Security Awareness**: Learn secure coding practices through hands-on exercises
- **Educational Settings**: University courses, boot camps, and self-paced learning
- **Certification Preparation**: CEH, OSCP, and related security certifications
- **Team Training**: Security team onboarding and regular skill assessment
