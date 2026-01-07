---
layout: vulnerable-lab
title: OWASP Security Shepherd
focus: Gamified web and mobile security training
type: VM/Container
category: Training Platform
description: A web and mobile security training platform with gamification elements, progress tracking, and extensive challenges covering web, mobile, and crypto vulnerabilities.
image: vulnerable-labs/security-shepherd.webp
github: https://github.com/OWASP/SecurityShepherd
website: https://owasp.org/www-project-security-shepherd/
---

OWASP Security Shepherd is a gamified web and mobile application security training platform designed to foster and improve security awareness among development teams.

## Overview

Security Shepherd provides a comprehensive learning environment with gamification elements, making security training engaging and competitive while covering a wide range of security topics.

## Key Features

- **Gamification**: Points, badges, and leaderboards
- **Progress Tracking**: Monitor learning advancement
- **Multiple Difficulty Levels**: From beginner to expert
- **Team Competition**: Support for group training
- **Customizable**: Configure challenges and difficulty
- **Multi-Language**: International support
- **Admin Dashboard**: Training management interface

## Challenge Categories

### Web Application Security
- SQL injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Session management
- Authentication flaws
- Authorization issues
- Cryptographic failures

### Mobile Security
- Android vulnerabilities
- iOS security issues
- Mobile API security
- Reverse engineering
- Insecure data storage
- Weak cryptography

### Cryptography
- Hash cracking
- Encryption/decryption
- Certificate validation
- Protocol security

### Advanced Topics
- Race conditions
- Business logic flaws
- XML external entities
- Insecure deserialization
- Server-side request forgery

## Deployment

### Docker (Recommended)
```bash
docker pull owasp/security-shepherd
docker run -p 80:80 -p 443:443 owasp/security-shepherd
```

### Manual Installation
```bash
git clone https://github.com/OWASP/SecurityShepherd.git
# Follow setup instructions for Tomcat deployment
```

## Use Cases

### Corporate Training
- Developer security awareness
- Team-building exercises
- Onboarding security training
- Regular skill assessment

### Educational Institutions
- University courses
- Boot camp curricula
- CTF competitions
- Student engagement

### Individual Learning
- Self-paced training
- Certification preparation
- Skill development
- Portfolio building

## Admin Features

- User management
- Challenge configuration
- Progress monitoring
- Custom challenges
- Score management
- Team administration

## Gamification Elements

- **Scoring System**: Points for completed challenges
- **Leaderboards**: Competition ranking
- **Badges**: Achievement awards
- **Difficulty Tiers**: Progressive learning
- **Time Tracking**: Speed challenges

## Customization

- Configure difficulty levels
- Enable/disable specific challenges
- Set custom scoring
- Brand the platform
- Add custom content

## Integration

- LDAP/AD authentication
- LMS integration
- API for external systems
- Reporting capabilities

Security Shepherd is ideal for organizations wanting to build a security-aware culture through engaging, competitive training that resonates with development teams.
