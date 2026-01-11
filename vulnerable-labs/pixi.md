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

Created by the OWASP DevSlop team, Pixi is the first installment in a series of deliberately vulnerable systems designed to help developers and security professionals learn about API security. While the module is no longer actively supported, it remains highly valuable as a testing platform because, as the developers note, "it's wildly vulnerable" and will "light up like a beautiful Christmas tree" when scanned with security tools.

## Technology Stack

### MEAN Stack Components
- **MongoDB**: NoSQL database for data storage
- **Express.js**: Backend web application framework
- **Angular**: Frontend JavaScript framework
- **Node.js**: Server-side JavaScript runtime

### Additional Technologies
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container orchestration

## Application Features

### Photo Sharing Platform
- User registration and authentication
- Photo upload and management
- Photo viewing and deletion
- User profiles
- Social features

## Covered Vulnerabilities

### API Security Issues

#### Broken Object Level Authorization (BOLA)
- Access other users' photos
- Manipulate unauthorized resources
- IDOR vulnerabilities

#### Broken Authentication
- Weak authentication mechanisms
- Session management flaws
- Missing authentication checks
- JWT implementation issues

#### Excessive Data Exposure
- API responses contain sensitive data
- Over-sharing of information
- Unnecessary data in endpoints

#### Lack of Resources & Rate Limiting
- **No Brute Force Protection**: Application has no code to detect or stop automated attacks
- **No Rate Limiting**: Unlimited API requests allowed
- **No Attack Detection**: Missing logging for automated aggression
- **No WAF/RASP Protection**: Unprotected from persistent attacks

#### Broken Function Level Authorization
- Missing authorization checks on API endpoints
- Access to admin functions
- Function-level access control bypass

#### Mass Assignment
- Ability to modify restricted fields
- Parameter pollution
- Object property manipulation

#### Injection Vulnerabilities
- **NoSQL Injection**: MongoDB query manipulation
- **XSS (Cross-Site Scripting)**: Script injection
- **Command Injection**: OS command execution

### Web Application Vulnerabilities

#### CSRF (Cross-Site Request Forgery)
- **GET-based State Changes**: Photo deletion via GET request
- **Missing CSRF Tokens**: No protection against cross-origin attacks
- **No SameSite Cookie Attributes**: Cookie vulnerabilities

#### Broken Access Control
- Horizontal privilege escalation
- Vertical privilege escalation
- Missing authorization on sensitive functions

#### Security Misconfiguration
- Default configurations
- Verbose error messages
- Exposed administrative interfaces
- Debug mode enabled

#### Sensitive Data Exposure
- Unencrypted data transmission
- Exposed credentials
- Information disclosure in errors
- Insecure data storage

#### Insecure File Upload
- Unrestricted file types
- No file validation
- Malicious file upload
- Path traversal via uploads

## Deployment

### Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/DevSlop/Pixi.git
cd Pixi

# Start all services
docker-compose up -d

# Access the application
# http://localhost:8000
```

### Manual Setup

```bash
# Install dependencies
npm install

# Start MongoDB
mongod

# Run application
npm start
```

## Testing Scenarios

### Beginner Level
1. **CSRF via GET**: Delete photos using GET requests
2. **NoSQL Injection**: Bypass authentication
3. **Information Disclosure**: Extract sensitive data from errors
4. **Missing Authorization**: Access other users' resources

### Intermediate Level
1. **Brute Force Attack**: Test lack of rate limiting
2. **Mass Assignment**: Modify user roles
3. **File Upload Exploitation**: Upload malicious files
4. **API Abuse**: Enumerate users and resources

### Advanced Level
1. **Complex Attack Chains**: Combine multiple vulnerabilities
2. **Automated Exploitation**: Write custom scripts
3. **API Security Assessment**: Full API testing methodology

## Use Cases

### Security Training
- **API Security Workshops**: Hands-on API testing
- **MEAN Stack Security**: Learn JavaScript security
- **Developer Training**: Secure coding practices
- **Security Awareness**: Demonstrate real vulnerabilities

### Tool Testing
- **DAST Scanner Validation**: Test dynamic scanners
- **API Security Tools**: Validate API testing tools
- **WAF Testing**: Test web application firewalls
- **Automated Security Testing**: CI/CD security integration

### Educational Programs
- **University Courses**: Web security curriculum
- **Bootcamps**: Security training programs
- **Self-Study**: Individual learning
- **CTF Preparation**: Practice for competitions

## Integration with Security Tools

### Compatible Tools
- **Burp Suite**: Full API testing support
- **OWASP ZAP**: Automated scanning
- **42Crunch**: API security platform
- **Semgrep**: Static analysis
- **Postman**: API testing and exploration

### WAF Protection Testing
- **OWASP Core Rule Set (CRS)**: Test WAF rules
- **ModSecurity**: Web application firewall testing
- **CRS Protection**: Evaluate protective capabilities

## Learning Objectives

### API Security Concepts
- Understand API vulnerability types
- Learn OWASP API Security Top 10
- Practice API penetration testing
- Master API exploitation techniques

### MEAN Stack Security
- MongoDB security issues
- Express.js vulnerabilities
- Angular security concerns
- Node.js security best practices

### Secure Development
- Input validation importance
- Authentication and authorization
- Rate limiting implementation
- CSRF protection mechanisms
- Secure file upload handling

## Best Practices Taught

### API Security
- Implement proper authentication
- Enforce authorization checks
- Use rate limiting and throttling
- Validate all inputs
- Sanitize outputs
- Implement CSRF protection
- Use HTTP verbs correctly (no state changes on GET)

### MEAN Stack Security
- Secure MongoDB queries
- Prevent NoSQL injection
- Implement secure session management
- Use security headers
- Enable HTTPS
- Validate file uploads
- Implement logging and monitoring

## What Makes Pixi Special

1. **MEAN Stack Focus**: Demonstrates JavaScript stack vulnerabilities
2. **API-Centric**: Emphasizes API security issues
3. **Real-World Patterns**: Mirrors common development mistakes
4. **Easy Deployment**: Simple Docker setup
5. **OWASP Project**: Part of official OWASP portfolio
6. **Tool Testing**: Excellent for security scanner validation
7. **Educational**: Clear demonstration of vulnerabilities

## Related DevSlop Projects

Pixi is part of the broader OWASP DevSlop initiative:
- **Pixi-CRS**: CI pipeline with Pixi and WAF testing
- **Other DevSlop Modules**: Additional vulnerable systems

## Community and Resources

### Documentation
- GitHub repository with setup instructions
- OWASP DevSlop project page
- Community writeups and tutorials
- Conference presentations

### Training Materials
- Used in OWASP Global AppSec training
- Integration with 42Crunch IDE Plugin
- Semgrep security analysis
- API security workshops

## Current Status

While no longer actively maintained, Pixi remains valuable for:
- Security tool testing
- API security training
- MEAN stack vulnerability research
- Educational demonstrations
- WAF and security control validation

Pixi provides an excellent platform for learning about API security vulnerabilities in modern JavaScript applications, making it essential for developers and security professionals working with MEAN stack and API-based architectures.
