---
layout: vulnerable-lab
title: OWASP VulnerableApp
focus: Web application and REST API vulnerabilities
type: Container
category: Web Applications
description: A scalable, extensible vulnerable application supporting both REST API and legacy UI, designed for testing security scanning tools with multiple vulnerability categories.
image: vulnerable-labs/vulnerableapp4apisecurity.webp
github: https://github.com/SasanLabs/VulnerableApp
website: https://sasanlabs.github.io/VulnerableApp/
---

OWASP VulnerableApp is part of the SasanLabs vulnerable application suite, designed to be scalable and extensible for testing security scanning tools and practicing penetration testing.

## Overview

This application provides a comprehensive set of web vulnerabilities designed specifically for testing security scanning tools. It supports both REST API and legacy UI modes, helping security professionals validate their tools and practice vulnerability identification.

## Key Features

- **Dual Interface**: REST API and Legacy UI
- **Scanner Endpoint**: Dedicated endpoint exposing all vulnerabilities for automated testing
- **Multi-Variant Support**: Both secure and insecure implementations for false positive testing
- **Well-Documented**: Comprehensive documentation with expected issues
- **Spring Boot Based**: Modern Java framework
- **Extensible Architecture**: Easy to add new vulnerabilities

## Covered Vulnerabilities

### Injection Attacks
- **SQL Injection**: Error-based, Union-based, and Blind SQLi
- **Command Injection**: OS command execution
- **XXE (XML External Entity)**: XML parsing vulnerabilities
- **Path Traversal**: Directory access bypass

### Authentication & Authorization
- **JWT Vulnerabilities**: Token manipulation and bypass
- **Session Management**: Authentication weaknesses
- **Authorization Issues**: Access control bypasses

### Cross-Site Scripting (XSS)
- Persistent XSS
- Reflected XSS
- DOM-based XSS

### Server-Side Vulnerabilities
- **SSRF (Server-Side Request Forgery)**: Internal resource access
- **Open Redirect**: URL redirection abuse
- **File Upload**: Malicious file handling

### Information Disclosure
- Error message exposure
- Debug information leakage
- Sensitive data exposure

## Deployment

### Docker
```bash
docker pull sasanlabs/owasp-vulnerableapp
docker run -p 9090:9090 sasanlabs/owasp-vulnerableapp
```

### From Source
```bash
git clone https://github.com/SasanLabs/VulnerableApp.git
cd VulnerableApp
./gradlew bootRun
```

## Scanner Integration

VulnerableApp exposes a special `/scanner` endpoint that provides:
- List of all vulnerabilities present
- SECURE vs UNSECURE variant information
- HTTP methods and vulnerability types
- Useful for validating scanner detection capabilities

## Use Cases

### Security Tool Testing
- Validate vulnerability scanners
- Test SAST/DAST tools
- Benchmark detection capabilities
- False positive verification

### Training & Education
- Web application security training
- Penetration testing practice
- Developer security awareness
- Security research

### Development
- Test security automation
- CI/CD security integration
- Custom scanner development
- Payload testing

This platform provides a comprehensive environment for testing security scanning tools and understanding modern web application vulnerabilities.
