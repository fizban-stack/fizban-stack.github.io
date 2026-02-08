---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
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

Created by roottusk, vAPI simulates a mobile-like API for an e-commerce platform with user management, product catalog, shopping cart, order processing, inventory, and simulated payment handling. It provides a realistic environment for practicing OWASP API Security Top 10 vulnerabilities along with business logic flaws in an accessible, self-contained format.

## Key Features

- **OWASP API Security Top 10**: Full coverage of all ten categories
- **E-Commerce Context**: Realistic business logic with users, products, carts, orders, and payments
- **Business Logic Flaws**: Price manipulation, inventory bypass, and discount abuse
- **Multiple Difficulty Levels**: Beginner through expert challenges
- **Self-Contained**: Easy Docker deployment with PHP and MySQL
- **Active Community**: Regular updates and community writeups

## Technology Stack

- **Backend**: PHP
- **Database**: MySQL
- **API Type**: RESTful with token-based authentication

## Getting Started

```bash
git clone https://github.com/roottusk/vapi.git
cd vapi
docker-compose up -d

# Access at http://localhost/vapi
```

## Vulnerability Categories

- Broken Object Level Authorization (BOLA/IDOR)
- Broken User Authentication and JWT Vulnerabilities
- Excessive Data Exposure and PII Leakage
- Missing Rate Limiting and Brute Force Opportunities
- Broken Function Level Authorization and Privilege Escalation
- Mass Assignment (Admin Status, Price, Role Elevation)
- Security Misconfiguration and Default Credentials
- SQL Injection, Command Injection, and LDAP Injection
- Legacy API Versions and Undocumented Endpoints
- Insufficient Logging and Monitoring
- Business Logic Flaws (Price Manipulation, Inventory Bypass)
- SSRF and Internal Service Access

## Use Cases

- **API Penetration Testing Practice**: Real-world e-commerce API scenarios
- **Bug Bounty Preparation**: Common API vulnerability patterns
- **Security Training**: Corporate workshops and team exercises
- **Tool Development**: Test and validate API security scanners
- **Certification Preparation**: OSWE, BSCP, and related exams
