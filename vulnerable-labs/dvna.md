---
layout: vulnerable-lab
title: DVNA
focus: Node.js security vulnerabilities
type: Container
category: Web Applications
description: Damn Vulnerable NodeJS Application demonstrating OWASP Top 10 vulnerabilities in Node.js applications with a focus on backend security issues.
image: vulnerable-labs/dvna.webp
github: https://github.com/appsecco/dvna
website: https://github.com/appsecco/dvna
---

DVNA (Damn Vulnerable Node Application) is a vulnerable Node.js application created by Appsecco to teach Node.js security.

## Overview

DVNA demonstrates OWASP Top 10 vulnerabilities in the context of Node.js and NoSQL databases, focusing on backend security issues specific to the Node.js ecosystem.

## Key Vulnerabilities

- Injection (SQL, NoSQL, Command)
- Broken authentication
- Sensitive data exposure
- XML external entities (XXE)
- Broken access control
- Security misconfiguration
- XSS (Cross-Site Scripting)
- Insecure deserialization
- Using components with known vulnerabilities
- Insufficient logging

## Technology Stack

- Runtime: Node.js
- Framework: Express
- Database: MySQL and SQLite
- Template: EJS

## Deployment

```bash
docker pull appsecco/dvna
docker run -p 9090:9090 appsecco/dvna
```

## Learning Focus

- Node.js-specific vulnerabilities
- NoSQL injection techniques
- Express framework security
- Async/await security issues
- NPM package vulnerabilities

Ideal for developers and security professionals working with Node.js applications.
