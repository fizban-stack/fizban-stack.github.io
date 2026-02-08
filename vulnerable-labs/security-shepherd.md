---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
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

Security Shepherd provides a comprehensive learning environment with gamification elements including points, badges, leaderboards, and team competition, making security training engaging and competitive. It covers web application security, mobile security (Android and iOS), cryptography, and advanced topics like race conditions, business logic flaws, and insecure deserialization. An admin dashboard allows training managers to configure challenges, monitor progress, and manage teams.

## Key Features

- **Gamification**: Points, badges, leaderboards, and team competition
- **Progress Tracking**: Monitor learning advancement across all challenges
- **Multiple Difficulty Levels**: From beginner to expert challenges
- **Admin Dashboard**: Training management, user administration, and score configuration
- **Multi-Language Support**: International accessibility
- **Customizable**: Enable/disable challenges, set custom scoring, and add content
- **Enterprise Integration**: LDAP/AD authentication and LMS integration

## Getting Started

```bash
# Docker (Recommended)
docker pull owasp/security-shepherd
docker run -p 80:80 -p 443:443 owasp/security-shepherd

# Manual Installation
git clone https://github.com/OWASP/SecurityShepherd.git
# Follow setup instructions for Tomcat deployment
```

## Vulnerability Categories

- SQL Injection and XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Session Management and Authentication Flaws
- Authorization and Access Control Issues
- Cryptographic Failures (Hash Cracking, Encryption, Certificate Validation)
- Android and iOS Mobile Vulnerabilities
- Mobile API Security and Reverse Engineering
- Insecure Data Storage and Weak Cryptography
- XML External Entities and Insecure Deserialization
- Race Conditions and Business Logic Flaws
- Server-Side Request Forgery

## Use Cases

- **Corporate Training**: Developer security awareness, team-building exercises, and onboarding
- **Educational Institutions**: University courses, boot camps, and CTF competitions
- **Individual Learning**: Self-paced training, certification preparation, and skill development
- **Team Assessments**: Regular security skill evaluation with leaderboards and scoring
