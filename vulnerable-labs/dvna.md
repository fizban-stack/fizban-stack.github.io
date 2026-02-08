---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: DVNA - Damn Vulnerable NodeJS Application
focus: Node.js and Express framework security
type: Container
category: Web Applications
description: Comprehensive Node.js vulnerable application by Appsecco demonstrating OWASP Top 10 vulnerabilities with detailed exploitation guides and fix recommendations.
image: vulnerable-labs/dvna.webp
github: https://github.com/appsecco/dvna
website: https://github.com/appsecco/dvna
---

DVNA (Damn Vulnerable NodeJS Application) is a vulnerable Node.js application created by Appsecco specifically designed to teach Node.js security through practical exploitation and remediation exercises.

## Overview

DVNA provides a comprehensive platform for learning about security vulnerabilities in Node.js applications. It includes vulnerable code snippets, detailed exploitation instructions, and fix recommendations, making it an excellent resource for both developers and security professionals. The built-in Gitbook documentation covers each vulnerability with step-by-step attack scenarios and remediation guidance.

## Key Features

- **Dual Branch Structure**: Master branch (current OWASP Top 10) and Fixes-2017 branch
- **Comprehensive Documentation**: Built-in Gitbook with exploitation guides and fix recommendations
- **Multiple Deployment Options**: Docker, docker-compose, and manual installation
- **Developer-Focused**: Includes vulnerable code snippets and remediation instructions
- **Realistic Application**: Demonstrates vulnerabilities in a contextual Node.js app
- **Dual Database Support**: MySQL for full deployment, SQLite for quick start

## Technology Stack

- **Runtime**: Node.js with Express.js framework
- **Authentication**: Passport.js
- **ORM**: Sequelize
- **Template Engine**: EJS
- **Database**: MySQL 5.7 or SQLite
- **Containerization**: Docker and Docker Compose

## Getting Started

```bash
# Quick start with Docker (SQLite)
docker pull appsecco/dvna:sqlite
docker run --name dvna -p 9090:9090 -d appsecco/dvna:sqlite

# Or with Docker Compose (MySQL + docs)
git clone https://github.com/appsecco/dvna.git
cd dvna
docker-compose up

# App: http://localhost:9090
# Docs: http://localhost:4000
```

## Vulnerability Categories

- SQL Injection (Sequelize ORM vulnerabilities)
- Command Injection (child_process exploitation)
- Template Injection (EJS)
- Broken Authentication and Session Management
- Sensitive Data Exposure and Information Disclosure
- XML External Entities (XXE)
- Broken Access Control and IDOR
- Security Misconfiguration and Missing Headers
- Cross-Site Scripting (Reflected, Stored, DOM-based)
- Insecure Deserialization and Remote Code Execution
- Vulnerable NPM Packages and Dependency Confusion
- Insufficient Logging and Monitoring
- Prototype Pollution and Regex DoS
- Path Traversal and Arbitrary File Read

## Use Cases

- **Developer Training**: Learn Node.js secure coding and Express.js security patterns
- **Penetration Testing Practice**: Hands-on Node.js application assessment
- **Security Scanner Validation**: Test SAST/DAST tools against known vulnerabilities
- **University Courses**: Web security curriculum with built-in documentation
- **Bug Bounty Preparation**: Practice finding real-world Node.js vulnerability patterns
