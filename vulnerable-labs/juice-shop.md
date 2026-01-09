---
layout: vulnerable-lab
title: OWASP Juice Shop
focus: Modern web application security (Node.js/Angular/Express)
type: Container
category: Web Applications
description: The most comprehensive intentionally insecure web application covering OWASP Top 10 and beyond with 100+ challenges, CTF support, and extensive documentation.
image: vulnerable-labs/juice-shop.webp
github: https://github.com/juice-shop/juice-shop
website: https://owasp.org/www-project-juice-shop/
---

OWASP Juice Shop is one of the most modern and sophisticated insecure web applications available for security training. It's a fully functional e-commerce application built with modern technologies that contains a wide variety of security vulnerabilities.

## Overview

Juice Shop is OWASP's flagship vulnerable application project, featuring over 100 challenges across multiple difficulty levels. It's designed to be used in security training, awareness demos, CTFs, and as a testing platform for security tools.

## Technology Stack

- **Frontend**: Angular
- **Backend**: Node.js with Express
- **Database**: SQLite (configurable to other databases)
- **Architecture**: Modern single-page application (SPA)

## Key Features

- **100+ Security Challenges**: Ranging from trivial to expert level
- **OWASP Top 10 Coverage**: All current OWASP Top 10 vulnerabilities
- **Beyond OWASP Top 10**: Includes broken anti-automation, XXE, prototype pollution, and more
- **Gamification**: Built-in scoreboard and challenge tracking
- **CTF Support**: Export CTF flags for competitions
- **Internationalization**: Available in 30+ languages
- **Free Hint System**: Progressive hints for learning
- **Companion Guide**: Comprehensive GitBook with solutions

## Deployment

```bash
# Docker (recommended)
docker pull bkimminich/juice-shop
docker run -d -p 3000:3000 bkimminich/juice-shop

# NPM
npm install -g juice-shop
juice-shop

# From Source
git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop
npm install
npm start
```

## Vulnerability Categories

- **Injection**: SQL, NoSQL, Command, LDAP injection
- **Broken Authentication**: Session management, password policies
- **Sensitive Data Exposure**: Confidential documents, API keys
- **XML External Entities (XXE)**: File disclosure attacks
- **Broken Access Control**: Vertical and horizontal privilege escalation
- **Security Misconfiguration**: Various misconfigurations
- **Cross-Site Scripting (XSS)**: Reflected, stored, DOM-based
- **Insecure Deserialization**: Object injection attacks
- **Using Components with Known Vulnerabilities**: Outdated dependencies
- **Insufficient Logging & Monitoring**: Detection gaps
- **Unvalidated Redirects**: Open redirect vulnerabilities
- **Cryptographic Issues**: Weak hashing, encryption flaws

## Learning Resources

### Official Resources
- **Juice Shop GitBook**: Comprehensive guide with solutions
- **Pwning OWASP Juice Shop**: Companion eBook
- **Video Walkthroughs**: Community-created tutorials
- **Conference Talks**: Presentations and demos

### Difficulty Levels
- ⭐ **Trivial**: Entry-level, easy to find
- ⭐⭐ **Easy**: Requires some investigation
- ⭐⭐⭐ **Medium**: Needs security knowledge
- ⭐⭐⭐⭐ **Hard**: Advanced techniques required
- ⭐⭐⭐⭐⭐ **Expert**: Extremely challenging
- ⭐⭐⭐⭐⭐⭐ **Legendary**: Only for the most skilled

## Use Cases

### Security Training
Perfect for teaching web application security concepts with real-world examples in a safe environment.

### CTF Events
Built-in CTF support with flag export, scoreboard, and team functionality.

### Tool Testing
Test web application security scanners, proxies, and other security tools.

### Awareness Demos
Demonstrate security vulnerabilities to developers and management.

### Interview Practice
Use challenges to assess candidate security knowledge.

## Why Juice Shop Stands Out

1. **Modern Stack**: Reflects current web development practices
2. **Continuous Updates**: Regular updates with new challenges
3. **Extensive Documentation**: Best-in-class learning resources
4. **Community Support**: Large, active community
5. **Enterprise Features**: Multi-user, customizable, Docker-ready
6. **Award Winning**: Multiple community choice awards

## Integration Capabilities

- **CI/CD Pipelines**: Automated security testing
- **Security Tool Testing**: Scanner validation
- **Workshop Platform**: Hosting security training sessions
- **Educational Curriculum**: University and bootcamp integration

## Community

With thousands of users worldwide, Juice Shop has an active community contributing challenges, translations, and improvements. It's used by universities, training organizations, and companies globally for security education.
