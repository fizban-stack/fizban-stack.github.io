---
layout: vulnerable-lab
title: NodeGoat
focus: Node.js/Express security
type: Container
category: Web Applications
description: OWASP NodeGoat project teaching the OWASP Top 10 security risks in the context of Node.js and MongoDB applications with hands-on tutorials.
image: vulnerable-labs/nodegoat.webp
github: https://github.com/OWASP/NodeGoat
website: https://github.com/OWASP/NodeGoat
---

NodeGoat is an OWASP project providing guidance on secure coding practices for Node.js applications through a vulnerable application and tutorial approach.

## Overview

Built by the OWASP community, NodeGoat teaches developers how to identify and fix security vulnerabilities in Node.js/MongoDB applications.

## Key Features

- Interactive tutorials for each vulnerability
- Code-level explanations
- Fix recommendations
- OWASP Top 10 coverage
- MongoDB security issues
- Session management flaws

## Vulnerabilities Covered

- Injection (SQL, NoSQL, Command)
- Broken authentication
- Sensitive data exposure
- XML external entities
- Broken access control
- Security misconfiguration
- XSS
- Insecure deserialization
- Using vulnerable components
- Insufficient logging

## Technology Stack

- Node.js
- Express framework
- MongoDB
- Mongoose ORM
- Passport.js authentication

## Deployment

```bash
git clone https://github.com/OWASP/NodeGoat.git
npm install
npm start
```

## Learning Approach

Each vulnerability includes:
- Vulnerable code example
- Exploitation demonstration
- Secure code alternative
- Best practice recommendations

Perfect for Node.js developers learning to write secure code.
