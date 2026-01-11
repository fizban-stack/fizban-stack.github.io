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

DVNA provides a comprehensive platform for learning about security vulnerabilities in Node.js applications. It includes vulnerable code snippets, detailed exploitation instructions, and fix recommendations, making it an excellent resource for both developers and security professionals.

## Key Features

- **Dual Branch Structure**: Master branch (current OWASP Top 10) and Fixes-2017 branch (2017 OWASP Top 10)
- **Comprehensive Documentation**: Built-in Gitbook with exploitation guides
- **Multiple Deployment Options**: Docker, docker-compose, and manual installation
- **Developer-Focused**: Includes code snippets and remediation instructions
- **Realistic Application**: Demonstrates vulnerabilities in context

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Passport.js
- **ORM**: Sequelize
- **Template Engine**: EJS (21.3% of codebase)

### Database Options
- **MySQL**: Full-featured deployment (version 5.7)
- **SQLite**: Quick-start lightweight option

### Additional Technologies
- **Docker**: Containerization support
- **Docker Compose**: Development environment
- **JavaScript**: Primary language (8.6%)
- **SCSS/Less**: Styling

## Covered Vulnerabilities

### OWASP Top 10 Coverage

#### 1. Injection
- **SQL Injection**: Sequelize ORM vulnerabilities
- **Command Injection**: Node.js child_process exploitation
- **Template Injection**: EJS template vulnerabilities
- **LDAP Injection**: Directory service query manipulation

#### 2. Broken Authentication
- **Weak Password Policies**: Insufficient password requirements
- **Session Management Flaws**: Express session vulnerabilities
- **Passport.js Misconfigurations**: Authentication bypass
- **JWT Implementation Issues**: Token manipulation

#### 3. Sensitive Data Exposure
- **Unencrypted Data Storage**: Plain text credentials
- **Exposed Configuration**: Environment variable leakage
- **Information Disclosure**: Error message exposure
- **Insecure Cryptographic Storage**: Weak encryption practices

#### 4. XML External Entities (XXE)
- **XML Parser Vulnerabilities**: External entity injection
- **File Disclosure**: Reading arbitrary files
- **SSRF via XXE**: Internal network access
- **DoS via XML**: Resource exhaustion

#### 5. Broken Access Control
- **Missing Authorization**: Unprotected endpoints
- **IDOR Vulnerabilities**: Object reference manipulation
- **Privilege Escalation**: Vertical access control bypass
- **Horizontal Escalation**: Access to other users' data

#### 6. Security Misconfiguration
- **Debug Mode Enabled**: Development settings in production
- **Default Credentials**: Unchanged default passwords
- **Verbose Error Messages**: Stack traces exposure
- **Unnecessary Features**: Unused endpoints enabled
- **Missing Security Headers**: Lack of protective headers

#### 7. Cross-Site Scripting (XSS)
- **Reflected XSS**: URL parameter injection
- **Stored XSS**: Database-stored scripts
- **DOM-Based XSS**: Client-side JavaScript vulnerabilities
- **EJS Template XSS**: Template engine injection

#### 8. Insecure Deserialization
- **Node.js Serialization**: Object injection attacks
- **JSON Parsing**: Unsafe JSON.parse usage
- **Remote Code Execution**: Deserialization to RCE

#### 9. Using Components with Known Vulnerabilities
- **Outdated NPM Packages**: Vulnerable dependencies
- **Known CVEs**: Exploitable third-party libraries
- **Dependency Confusion**: Package namespace attacks
- **Supply Chain Issues**: Compromised packages

#### 10. Insufficient Logging & Monitoring
- **Missing Security Events**: No attack detection
- **Inadequate Logging**: Insufficient audit trails
- **No Alerting**: Lack of monitoring
- **Poor Log Management**: Insecure log storage

### Node.js-Specific Vulnerabilities

#### Express Framework Issues
- **Route Parameter Pollution**: Mass assignment vulnerabilities
- **Middleware Bypass**: Authentication/authorization skipping
- **Prototype Pollution**: Object property injection
- **Regex DoS**: Regular expression denial of service

#### Asynchronous Security
- **Race Conditions**: Async/await vulnerabilities
- **Callback Security**: Improper error handling
- **Promise Rejection**: Unhandled rejections
- **Event Loop Blocking**: DoS vulnerabilities

#### File System Vulnerabilities
- **Path Traversal**: Directory traversal attacks
- **Arbitrary File Read**: Reading sensitive files
- **File Upload**: Unrestricted file uploads
- **Symlink Attacks**: Symbolic link exploitation

## Deployment

### Quick Start with Docker (SQLite)

```bash
# Pull and run with SQLite
docker pull appsecco/dvna:sqlite
docker run --name dvna -p 9090:9090 -d appsecco/dvna:sqlite

# Access application
# http://localhost:9090
```

### Development with Docker Compose (MySQL)

```bash
# Clone repository
git clone https://github.com/appsecco/dvna.git
cd dvna

# Start with MySQL and auto-reload
docker-compose up

# Access application: http://localhost:9090
# Access documentation: http://localhost:4000
```

### Manual Installation

```bash
# Prerequisites: Node.js and MySQL 5.7

# Clone repository
git clone https://github.com/appsecco/dvna.git
cd dvna

# Install dependencies
npm install

# Configure environment variables
cp .env.sample .env
# Edit .env with database credentials

# Create database
mysql -u root -p
CREATE DATABASE dvna;

# Initialize application
npm run db:migrate
npm run db:seed

# Start application
npm start

# Access at http://localhost:9090
```

## Learning Resources

### Built-in Documentation

DVNA includes comprehensive Gitbook documentation accessible at `http://localhost:4000` covering:

- **Setup Instructions**: Detailed deployment guides
- **Vulnerability Explanations**: Each OWASP Top 10 category
- **Exploitation Techniques**: Step-by-step attack scenarios
- **Vulnerable Code Snippets**: Real code examples
- **Fix Recommendations**: Remediation guidance
- **Prevention Best Practices**: Secure coding patterns
- **Reference Materials**: Additional learning resources

## Use Cases

### Developer Training
- **Secure Coding**: Learn Node.js security best practices
- **Code Review**: Identify vulnerable patterns
- **Security Awareness**: Understand attack techniques
- **Framework Security**: Express.js security concepts

### Security Testing
- **Penetration Testing**: Practice Node.js app testing
- **Vulnerability Assessment**: Identify security issues
- **Tool Validation**: Test security scanners
- **Exploit Development**: Develop custom exploits

### Educational Programs
- **University Courses**: Web security curriculum
- **Corporate Training**: Developer security training
- **Self-Study**: Individual learning platform
- **Bug Bounty Prep**: Practice finding vulnerabilities

### Tool Development
- **Scanner Testing**: Validate SAST/DAST tools
- **Security Automation**: Test automated tools
- **CI/CD Security**: Integration testing
- **Custom Tool Development**: Build security tools

## Testing Approach

### 1. Reconnaissance
- Explore application functionality
- Map available endpoints
- Identify input points
- Review client-side code

### 2. Vulnerability Identification
- Test for injection vulnerabilities
- Check authentication mechanisms
- Examine access controls
- Review error handling

### 3. Exploitation
- Exploit discovered vulnerabilities
- Chain multiple issues
- Escalate privileges
- Extract sensitive data

### 4. Remediation
- Review fix recommendations
- Implement secure code
- Test fixes
- Validate remediation

## Best Practices Taught

### Node.js Security
- Input validation and sanitization
- Parameterized queries with Sequelize
- Secure session management
- Proper error handling
- Security header implementation
- Dependency management
- Environment variable security

### Express Framework
- Middleware security
- Route protection
- CSRF token implementation
- Rate limiting
- Input validation
- Output encoding

### Development Practices
- Secure defaults
- Principle of least privilege
- Defense in depth
- Security testing in SDLC
- Code review processes

## Integration with Security Tools

### Compatible Tools
- **Burp Suite**: Manual testing
- **OWASP ZAP**: Automated scanning
- **Snyk**: Dependency scanning
- **npm audit**: Package vulnerability checking
- **Node Security Platform**: Security scanning

## What Makes DVNA Special

1. **Node.js Focus**: Specifically designed for Node.js ecosystem
2. **Comprehensive Documentation**: Built-in Gitbook guide
3. **Code-Level Learning**: Actual vulnerable code snippets
4. **Fix Recommendations**: Remediation guidance included
5. **Multiple Databases**: MySQL and SQLite support
6. **Active Maintenance**: Regular updates
7. **Appsecco Quality**: Professional security company creation

DVNA provides an excellent, focused platform for learning about security vulnerabilities specific to Node.js applications, making it essential for developers and security professionals working in the Node.js ecosystem.
