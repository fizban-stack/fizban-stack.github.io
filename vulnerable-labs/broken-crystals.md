---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Broken Crystals
focus: Modern web application security with React, TypeScript, and NestJS
type: Container
category: Web Applications
description: A comprehensive vulnerable benchmark application built with modern tech stack (React, TypeScript, NestJS, GraphQL) demonstrating OWASP Top 10 and beyond.
image: vulnerable-labs/broken-crystals.webp
github: https://github.com/NeuraLegion/brokencrystals
website: https://github.com/NeuraLegion/brokencrystals
---

Broken Crystals is a modern vulnerable web application created by NeuraLegion (Bright Security), built with contemporary technologies to demonstrate security vulnerabilities in current web development stacks.

## Overview

This application serves as a comprehensive benchmark for testing security scanning tools and learning about vulnerabilities in modern web applications. It features both REST and GraphQL APIs, making it ideal for testing contemporary security tools. The application covers the full OWASP Top 10 and extends into additional vulnerability classes including prototype pollution, GraphQL abuse, and advanced injection techniques.

## Technology Stack

- **Backend**: NestJS (TypeScript), PostgreSQL, REST (OpenAPI/Swagger), GraphQL, gRPC
- **Frontend**: React (TypeScript)
- **Infrastructure**: Docker, Docker Compose, Nginx, MailCatcher

## Getting Started

```bash
git clone https://github.com/NeuraLegion/brokencrystals.git
cd brokencrystals
docker-compose up -d

# Frontend: http://localhost:3000
# REST API: http://localhost:3000/api
# GraphQL: http://localhost:3000/graphql
```

## Vulnerability Categories

- Broken Access Control (Vertical/Horizontal Escalation, IDOR, Mass Assignment)
- Weak JWT Secrets, Algorithm Confusion, and Hardcoded Credentials
- SQL Injection, LDAP Injection, XPath Injection, and OS Command Injection
- Server-Side Template Injection (SSTI)
- NoSQL Injection
- CORS Misconfiguration and Directory Listing
- Vulnerable JavaScript Libraries and Prototype Pollution
- Brute Force and Missing Rate Limiting
- Insecure Deserialization and Unrestricted File Upload
- Server-Side Request Forgery (SSRF)
- Cross-Site Scripting (Reflected, Stored, DOM-based)
- CSRF and HTML Injection
- XXE (XML External Entity)
- GraphQL Introspection, Query Depth Attacks, and Batch Queries
- Path Traversal and File Inclusion

## Use Cases

- **Security Tool Benchmarking**: Validate DAST scanners against REST and GraphQL APIs
- **Modern Web Security Training**: Learn vulnerabilities in current tech stacks (NestJS, React, GraphQL)
- **Developer Education**: Understand secure coding practices for TypeScript applications
- **CI/CD Security Integration**: Automated security testing in pipelines
- **Vulnerability Research**: Study attack techniques across multiple API paradigms
