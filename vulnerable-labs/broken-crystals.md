---
layout: vulnerable-lab
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

This application serves as a comprehensive benchmark for testing security scanning tools and learning about vulnerabilities in modern web applications. It features both REST and GraphQL APIs, making it ideal for testing contemporary security tools.

## Technology Stack

### Backend
- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **APIs**: REST (OpenAPI/Swagger), GraphQL, gRPC
- **Architecture**: Microservices

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **Styling**: CSS

### Infrastructure
- **Containerization**: Docker
- **Email Testing**: MailCatcher
- **Web Server**: Nginx
- **Orchestration**: Docker Compose

## Covered Vulnerabilities

### OWASP Top 10

#### 1. Broken Access Control
- **Vertical Privilege Escalation**: Access admin functionality
- **Horizontal Privilege Escalation**: Access other users' data
- **Function-Level Authorization**: Missing authorization checks
- **IDOR (Insecure Direct Object References)**: Manipulate object IDs
- **Mass Assignment**: Modify restricted properties

#### 2. Cryptographic Failures
- **Weak JWT Secrets**: Brute force JWT signing keys
- **Algorithm Confusion**: JWT algorithm manipulation (none, HS256 vs RS256)
- **Exposed Secrets**: Hard-coded credentials in code
- **Weak Cookie Security**: Insecure cookie attributes
- **Information Disclosure**: Database credentials exposure

#### 3. Injection
- **SQL Injection**: Multiple endpoints vulnerable to SQLi
- **LDAP Injection**: LDAP query manipulation
- **XPath Injection**: XML path injection
- **OS Command Injection**: System command execution
- **Server-Side Template Injection (SSTI)**: Template engine exploitation
- **NoSQL Injection**: Database query manipulation

#### 4. Insecure Design
- **Brute Force**: No rate limiting on login
- **Business Logic Flaws**: Workflow manipulation
- **Unvalidated Redirects**: Open redirect vulnerabilities

#### 5. Security Misconfiguration
- **CORS Misconfiguration**: Overly permissive CORS headers
- **Directory Listing**: Exposed directory structures
- **Debug Mode**: Error messages with stack traces
- **Default Configurations**: Insecure default settings
- **Known Vulnerable Components**: Outdated JavaScript libraries

#### 6. Vulnerable and Outdated Components
- **JavaScript Library Vulnerabilities**: Known CVEs in dependencies
- **Prototype Pollution**: JavaScript prototype manipulation
- **Dependency Issues**: Vulnerable npm packages

#### 7. Identification and Authentication Failures
- **JWT Vulnerabilities**:
  - Algorithm manipulation (none algorithm)
  - Signature tampering
  - Weak signing secrets
  - Missing expiration validation
- **Brute Force Attacks**: Credential stuffing
- **Session Management**: Insecure session handling

#### 8. Software and Data Integrity Failures
- **Insecure Deserialization**: Object injection attacks
- **Unrestricted File Upload**: Malicious file uploads
- **File Inclusion**: Local and remote file inclusion

#### 9. Security Logging and Monitoring Failures
- **Insufficient Logging**: Missing security events
- **No Attack Detection**: Lack of monitoring

#### 10. Server-Side Request Forgery (SSRF)
- **Internal Network Access**: Access internal resources
- **Cloud Metadata**: AWS/Azure metadata service abuse
- **Port Scanning**: Internal port enumeration

### Additional Vulnerabilities

#### Client-Side Issues
- **Cross-Site Scripting (XSS)**:
  - Reflected XSS
  - Stored/Persistent XSS
  - DOM-based XSS
- **CSRF (Cross-Site Request Forgery)**: State-changing requests
- **Prototype Pollution**: JavaScript object manipulation
- **Insecure Output Handling**: HTML injection

#### Data Handling
- **Path Traversal**: Directory traversal attacks
- **XXE (XML External Entity)**: XML parser exploitation
- **Excessive Data Exposure**: Over-sharing in API responses
- **Sensitive Data Exposure**: PII leakage

#### API-Specific
- **GraphQL Vulnerabilities**:
  - Introspection enabled
  - No query depth limiting
  - Batch query attacks
- **REST API Issues**:
  - Missing input validation
  - Verbose error messages
  - Lack of rate limiting

## Deployment

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/NeuraLegion/brokencrystals.git
cd brokencrystals

# Start all services
docker-compose up -d

# Access the application
# http://localhost:3000 (Frontend)
# http://localhost:3000/api (REST API)
# http://localhost:3000/graphql (GraphQL)
```

### Local Development

```bash
# Install dependencies
npm install

# Start PostgreSQL
docker-compose up -d postgres

# Run application
npm run start:dev

# Access at http://localhost:3000
```

## API Documentation

### REST API
- **Swagger UI**: Available at `/api`
- **OpenAPI Spec**: Full API documentation
- **Multiple Endpoints**: User management, products, authentication

### GraphQL API
- **GraphQL Playground**: Available at `/graphql`
- **Introspection**: Enabled for testing
- **Mutations & Queries**: Full CRUD operations

## Testing Scenarios

### Beginner Level
1. **Basic SQLi**: Find and exploit SQL injection
2. **XSS Discovery**: Identify reflected XSS
3. **Broken Authentication**: Brute force login
4. **Directory Traversal**: Access arbitrary files

### Intermediate Level
1. **JWT Manipulation**: Exploit JWT vulnerabilities
2. **SSRF Exploitation**: Access internal resources
3. **XXE Attacks**: Extract files via XML
4. **GraphQL Abuse**: Query depth attacks

### Advanced Level
1. **SSTI Exploitation**: Template injection to RCE
2. **Prototype Pollution**: Achieve code execution
3. **Complex Attack Chains**: Multi-step exploits
4. **Authorization Bypass**: Horizontal and vertical escalation

## Use Cases

### Security Tool Testing
- **DAST Scanner Validation**: Test dynamic scanners
- **API Security Testing**: GraphQL and REST scanners
- **Vulnerability Assessment**: Benchmark tool accuracy
- **CI/CD Integration**: Automated security testing

### Training & Education
- **Modern Web Security**: Learn current vulnerabilities
- **Developer Training**: Secure coding practices
- **Security Awareness**: Demonstrate real-world risks
- **Hands-On Labs**: Interactive security exercises

### Research & Development
- **Vulnerability Research**: Study attack techniques
- **Tool Development**: Build security tools
- **PoC Development**: Test exploitation concepts
- **Security Automation**: Develop custom scripts

## Integration with Security Tools

### Compatible Tools
- **Burp Suite**: Full proxy support
- **OWASP ZAP**: Automated scanning
- **Bright Security**: Native integration
- **Nuclei**: Template-based testing
- **Custom Scripts**: API for automation

## Learning Resources

### Included Documentation
- Detailed vulnerability descriptions
- Exploitation examples
- Remediation guidance
- API documentation

### Practice Areas
- REST API security
- GraphQL security
- JWT exploitation
- Modern injection attacks
- Client-side vulnerabilities

## Best Practices Taught

### Secure Development
- Input validation and sanitization
- Secure JWT implementation
- Proper authorization checks
- CSRF protection
- Secure file upload handling
- SQL parameterization
- GraphQL query limiting

### Security Testing
- API security testing methodology
- GraphQL penetration testing
- Modern web app testing
- Automated security scanning
- Vulnerability exploitation

## What Makes Broken Crystals Special

1. **Modern Stack**: Current technologies (NestJS, React, GraphQL)
2. **Dual APIs**: Both REST and GraphQL vulnerabilities
3. **Comprehensive Coverage**: OWASP Top 10 and beyond
4. **Active Maintenance**: Regular updates
5. **Professional Grade**: Created by security company
6. **Realistic**: Mirrors production application patterns
7. **Well-Documented**: Clear documentation and examples

Broken Crystals provides an excellent platform for testing modern application security tools and learning about vulnerabilities in contemporary web development stacks, making it essential for anyone working with current technologies.
