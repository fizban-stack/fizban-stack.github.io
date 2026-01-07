---
layout: vulnerable-lab
title: VAmPI
focus: API security vulnerabilities and OWASP API Top 10
type: Container
category: API Security
description: Vulnerable API made with Flask to practice API security testing covering OWASP API Security Top 10 vulnerabilities with a simple bookstore API.
image: vulnerable-labs/vampi.webp
github: https://github.com/erev0s/VAmPI
website: https://github.com/erev0s/VAmPI
---

VAmPI (Vulnerable API) is a vulnerable API made with Flask, designed specifically for practicing API security testing and learning about OWASP API Security Top 10 vulnerabilities.

## Overview

VAmPI provides a simple bookstore API with intentional security vulnerabilities, making it perfect for beginners learning API security and experienced testers practicing their skills.

## Technology Stack

- **Framework**: Flask (Python)
- **Database**: SQLite
- **API Type**: RESTful JSON API
- **Authentication**: JWT tokens

## Covered Vulnerabilities

### OWASP API Security Top 10

1. **Broken Object Level Authorization (BOLA)**: Access other users' data
2. **Broken User Authentication**: Weak JWT implementation
3. **Excessive Data Exposure**: Over-sharing in API responses
4. **Lack of Resources & Rate Limiting**: No rate limiting
5. **Broken Function Level Authorization**: Access admin functions
6. **Mass Assignment**: Modify restricted fields
7. **Security Misconfiguration**: Debug mode enabled
8. **Injection**: SQL injection vulnerabilities
9. **Improper Assets Management**: Unversioned endpoints
10. **Insufficient Logging**: Minimal security logging

## API Endpoints

- User registration and authentication
- Book management (CRUD operations)
- User profile management
- Admin functionalities
- Search and filtering

## Deployment

```bash
# Docker (Recommended)
docker pull erev0s/vampi
docker run -p 5000:5000 erev0s/vampi

# From Source
git clone https://github.com/erev0s/VAmPI.git
cd VAmPI
pip3 install -r requirements.txt
python3 app.py
```

## Testing Tools

Compatible with:
- Burp Suite
- Postman
- OWASP ZAP
- curl
- Python requests library

## Learning Path

1. **Explore API**: Use Postman to understand endpoints
2. **Broken Authentication**: Exploit JWT weaknesses
3. **Authorization Issues**: Access other users' data
4. **Injection Attacks**: Find and exploit SQL injection
5. **Data Exposure**: Identify excessive data sharing
6. **Mass Assignment**: Manipulate object properties

## Use Cases

- **API Security Training**: Learn API vulnerabilities
- **Bug Bounty Prep**: Practice API hacking techniques
- **Tool Development**: Test API security scanners
- **Workshops**: Hands-on API security training
- **Certification Prep**: OSWE, BSCP preparation

## Features

- Simple and lightweight
- Well-documented vulnerabilities
- Easy to deploy
- Real-world API scenarios
- Beginner-friendly

## Challenge Levels

- Beginner: Basic BOLA and authentication
- Intermediate: Injection and mass assignment
- Advanced: Complex authorization chains

VAmPI is an excellent starting point for anyone new to API security testing, providing a straightforward environment to learn fundamental API vulnerabilities.
