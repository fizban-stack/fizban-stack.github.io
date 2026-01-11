---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Tiredful API
focus: REST API security and OWASP API Top 10
type: Container
category: API Security
description: Payatu Labs' intentionally vulnerable REST API demonstrating API security flaws including IDOR, SQL injection, XSS, broken authentication, and JWT vulnerabilities.
image: vulnerable-labs/tiredful-api.webp
github: https://github.com/payatu/Tiredful-API
website: https://github.com/payatu/Tiredful-API
---

Tiredful API is an intentionally vulnerable REST API created by Payatu Labs to teach developers, QA professionals, and security practitioners about common API security flaws resulting from insecure coding practices.

## Overview

Built on Django and Django REST Framework, Tiredful API provides a hands-on learning platform for understanding API security vulnerabilities. The project demonstrates realistic API security issues found in production environments, making it an excellent resource for both learning and tool testing.

## Key Features

- **Django REST Framework**: Modern Python API framework
- **RESTful Architecture**: Standard REST API patterns
- **SQLite Database**: Lightweight database with injection vulnerabilities
- **JWT Support**: Token-based authentication with flaws
- **Multiple Endpoints**: Diverse vulnerability scenarios
- **Docker Support**: Easy containerized deployment
- **Python 3 Compatible**: Modern Python version support
- **Educational Focus**: Clear vulnerability demonstrations

## Target Audience

- **Web Developers**: Learn secure API development
- **Penetration Testers**: Practice API security testing
- **Security Professionals**: Understand API vulnerabilities
- **Students**: Educational API security resource
- **QA Engineers**: API security testing skills

## Technology Stack

### Backend
- **Framework**: Django and Django REST Framework
- **Language**: Python 3
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **API Style**: RESTful JSON API

### Deployment
- **Container**: Docker
- **Development Server**: Django development server
- **Dependencies**: Requirements.txt managed

## Covered Vulnerabilities

### OWASP API Security Top 10

#### API1: Broken Object Level Authorization (BOLA)
- **Insecure Direct Object References (IDOR)**: Access unauthorized user data
- **Missing Authorization Checks**: Unrestricted object access
- **Horizontal Privilege Escalation**: View other users' resources
- **Parameter Tampering**: Modify IDs to access forbidden data

**Example Scenarios:**
- Access other users' profiles via ID manipulation
- View unauthorized transaction history
- Modify resources belonging to other users
- Enumerate user data through sequential IDs

#### API2: Broken User Authentication
- **Weak JWT Implementation**: Token manipulation vulnerabilities
- **Missing Token Validation**: Unverified authentication tokens
- **Weak Password Policies**: Insufficient password requirements
- **Session Management Flaws**: Insecure session handling
- **Credential Stuffing**: No brute force protection

**JWT-Specific Issues:**
- Algorithm confusion attacks
- Weak signing secrets
- Missing expiration validation
- Token leakage in responses

#### API3: Excessive Data Exposure
- **Information Disclosure**: Unnecessary data in responses
- **Sensitive Data Leakage**: PII exposure in API calls
- **Verbose Error Messages**: Stack traces and debug info
- **Over-sharing**: More data than needed returned
- **Metadata Exposure**: Internal system information

#### API4: Lack of Resources & Rate Limiting
- **No Rate Limiting**: Unlimited API requests
- **Resource Exhaustion**: DoS vulnerabilities
- **Brute Force Attacks**: Credential stuffing possible
- **API Abuse**: Unrestricted endpoint access
- **Cost Exploitation**: Resource consumption attacks

#### API5: Broken Function Level Authorization
- **Missing Authorization Checks**: Unprotected admin functions
- **Role-Based Access Bypass**: Privilege escalation
- **Function-Level Access Control**: Inadequate endpoint protection
- **Admin Endpoint Exposure**: Publicly accessible admin APIs

#### API6: Mass Assignment
- **Parameter Pollution**: Modify restricted fields
- **Unvalidated Object Properties**: Arbitrary property manipulation
- **Privilege Escalation**: Elevate user roles via mass assignment
- **Binding Vulnerabilities**: Automatic property binding flaws

#### API7: Security Misconfiguration
- **Default Configurations**: Insecure default settings
- **Verbose Errors**: Detailed error messages
- **Debug Mode Enabled**: Development features in production
- **Missing Security Headers**: Lack of protective headers
- **CORS Misconfiguration**: Overly permissive CORS policies

#### API8: Injection
- **SQL Injection (SQLite)**: Database query manipulation
  - Union-based injection
  - Error-based injection
  - Blind SQL injection
- **Cross-Site Scripting (XSS)**: Script injection in API responses
  - Stored XSS via API data
  - Reflected XSS in error messages
- **Command Injection**: OS command execution (if applicable)

#### API9: Improper Assets Management
- **Unversioned APIs**: Lack of API versioning
- **Deprecated Endpoints**: Old, insecure endpoints still active
- **API Documentation Exposure**: Publicly accessible API docs
- **Shadow APIs**: Undocumented endpoints

#### API10: Insufficient Logging & Monitoring
- **Missing Audit Logs**: No security event logging
- **Inadequate Monitoring**: Lack of attack detection
- **No Alerting**: Missing security notifications
- **Poor Log Management**: Insecure or incomplete logs

### Additional Vulnerabilities

#### Access Control Flaws
- Missing authentication on sensitive endpoints
- Broken authorization logic
- Insecure role management
- Account enumeration

#### Business Logic Vulnerabilities
- Workflow bypass
- Price manipulation
- Quantity validation bypass
- State tampering

## Deployment

### Docker (Recommended)

```bash
# Pull from Docker Hub
docker pull payatu/tiredful
docker run -p 8000:8000 payatu/tiredful

# Or build from source
git clone https://github.com/payatu/Tiredful-API.git
cd Tiredful-API
docker build -t tiredful-api .
docker run -p 8000:8000 tiredful-api

# Access the API
# http://localhost:8000
```

### Local Development

```bash
# Clone repository
git clone https://github.com/payatu/Tiredful-API.git
cd Tiredful-API

# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver

# Access at http://localhost:8000
```

## API Endpoints

The API includes various endpoints demonstrating different vulnerabilities:

### Authentication Endpoints
- User registration
- User login (JWT token generation)
- Token refresh
- Password reset

### User Management
- User profile retrieval
- Profile updates
- User enumeration
- Account deletion

### Data Operations
- CRUD operations on resources
- Search and filtering
- Data export
- File uploads

### Admin Functions
- Administrative operations
- User management
- System configuration
- Reporting

## Testing Methodology

### 1. Reconnaissance
- Enumerate all API endpoints
- Review API documentation (if available)
- Identify authentication mechanisms
- Map parameter structures

### 2. Authentication Testing
- Test weak credentials
- Attempt JWT manipulation
- Brute force attacks
- Session management issues

### 3. Authorization Testing
- Test IDOR vulnerabilities
- Horizontal privilege escalation
- Vertical privilege escalation
- Function-level access control

### 4. Injection Testing
- SQL injection testing
- XSS in API responses
- Command injection attempts
- NoSQL injection (if applicable)

### 5. Business Logic Testing
- Rate limiting bypass
- Mass assignment exploitation
- Workflow manipulation
- Data validation bypass

### 6. Information Disclosure
- Excessive data exposure
- Error message analysis
- Metadata extraction
- Sensitive data leakage

## Testing Tools

### HTTP Clients
- **Burp Suite**: Comprehensive API testing
- **Postman**: API exploration and testing
- **Insomnia**: REST API client
- **curl**: Command-line HTTP testing
- **HTTPie**: User-friendly HTTP client

### Automated Scanners
- **OWASP ZAP**: Automated API scanning
- **Nuclei**: Template-based testing
- **Nikto**: Web server scanner
- **Arjun**: HTTP parameter discovery

### Custom Scripts
- **Python Requests**: Custom automation
- **JavaScript/Node.js**: API testing scripts
- **Bash/Shell**: Command-line automation

## Learning Objectives

### Understanding API Security
- Learn common API vulnerabilities
- Understand OWASP API Security Top 10
- Master REST API security concepts
- Recognize insecure coding patterns

### Penetration Testing Skills
- Practice API security assessment
- Develop exploitation techniques
- Learn vulnerability chaining
- Master API testing methodology

### Secure Development
- Implement proper authentication
- Enforce authorization checks
- Validate all inputs
- Secure data exposure
- Apply rate limiting

## Use Cases

### Security Training
- **API Security Courses**: Hands-on API testing
- **Developer Workshops**: Secure coding practices
- **Security Awareness**: Demonstrate API risks
- **Certification Prep**: OSWE, BSCP preparation

### Professional Practice
- **Penetration Testing**: API assessment skills
- **Bug Bounty**: Practice finding API bugs
- **Tool Validation**: Test API security scanners
- **Security Research**: Understand API attack vectors

### Educational Programs
- **University Courses**: Web security curriculum
- **Bootcamps**: Security training programs
- **Self-Study**: Individual learning platform
- **CTF Preparation**: Competition practice

## Best Practices Taught

### Authentication & Authorization
- Implement strong JWT practices
- Use proper token validation
- Enforce least privilege
- Implement role-based access control
- Verify authorization on every request

### Input Validation
- Validate all user inputs
- Use parameterized queries
- Implement allowlisting
- Sanitize outputs
- Validate data types and ranges

### API Security Hardening
- Implement rate limiting
- Use security headers
- Enable HTTPS only
- Version your APIs
- Document security requirements

### Monitoring & Logging
- Log security events
- Monitor for anomalies
- Implement alerting
- Maintain audit trails
- Protect log data

## Integration with Security Tools

### Compatible With
- Burp Suite Professional
- OWASP ZAP
- Postman API testing
- Swagger/OpenAPI tools
- Custom automation frameworks

### CI/CD Integration
- Automated security testing
- API security scanning
- Vulnerability detection
- Security gate implementation

## Related Projects

### JWT Scenarios
External repository with additional JWT-based vulnerabilities:
- Advanced token manipulation
- Algorithm confusion
- Key confusion attacks
- None algorithm exploitation

## What Makes Tiredful API Special

1. **Payatu Quality**: Professional security company creation
2. **Django Framework**: Modern Python web framework
3. **Educational Focus**: Clear vulnerability demonstrations
4. **Easy Deployment**: Docker and local setup options
5. **Realistic Scenarios**: Production-like API patterns
6. **Comprehensive Coverage**: Multiple vulnerability types
7. **Active Community**: Regular updates and support

Tiredful API provides an excellent platform for learning REST API security, making it essential for developers, security professionals, and anyone involved in API development or testing.
