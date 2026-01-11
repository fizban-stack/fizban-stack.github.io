---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Damn Vulnerable Bank
focus: Mobile banking security and API vulnerabilities
type: Android APK
category: Android Security
description: Intentionally vulnerable Android banking application with backend API demonstrating mobile-specific vulnerabilities and backend API security issues for financial applications.
image: vulnerable-labs/damn-vulnerable-bank.webp
github: https://github.com/rewanthtammana/Damn-Vulnerable-Bank
website: https://github.com/rewanthtammana/Damn-Vulnerable-Bank
---

Damn Vulnerable Bank is an intentionally vulnerable Android banking application with a backend API server, created to demonstrate both mobile client-side and server-side security vulnerabilities in financial applications.

## Overview

Created by Rewanth Tammana, Damn Vulnerable Bank provides a comprehensive platform for learning about mobile banking security, covering both the Android application vulnerabilities and API security issues.

## Architecture

### Components
- **Android Application**: Mobile banking client (APK)
- **Backend API**: Node.js/Express server
- **Database**: MySQL/SQLite
- **Documentation**: Swagger API docs

### Technology Stack
- **Mobile**: Java/Kotlin for Android
- **Backend**: Node.js, Express
- **Database**: MySQL
- **API**: RESTful JSON API
- **Auth**: JWT tokens

## Android App Vulnerabilities

### OWASP Mobile Top 10

#### M1: Improper Platform Usage
- Misuse of TouchID/FaceID
- Insecure keychain usage
- Android-specific API misuse

#### M2: Insecure Data Storage
- **SharedPreferences**: Credentials in plaintext
- **SQLite Database**: Unencrypted transaction data
- **External Storage**: Sensitive files accessible
- **Application Logs**: Logging sensitive information
- **Clipboard**: Sensitive data exposure

#### M3: Insecure Communication
- Cleartext HTTP traffic
- Missing certificate pinning
- Weak TLS configuration
- Man-in-the-middle vulnerabilities

#### M4: Insecure Authentication
- Weak password requirements
- Predictable session tokens
- Missing MFA
- Biometric bypass

#### M5: Insufficient Cryptography
- Hardcoded encryption keys
- ECB mode usage
- Weak hash algorithms (MD5, SHA1)
- Custom crypto implementations

#### M6: Insecure Authorization
- IDOR on account endpoints
- Missing authorization checks
- Horizontal privilege escalation
- Bypass to admin functions

#### M7: Client Code Quality
- Memory corruption
- Buffer overflows
- Format string vulnerabilities

#### M8: Code Tampering
- No root detection
- Missing integrity checks
- Repackaging vulnerabilities
- Debugging enabled

#### M9: Reverse Engineering
- No code obfuscation
- String encryption missing
- Easy to decompile
- No anti-tampering

#### M10: Extraneous Functionality
- Debug endpoints in production
- Test accounts active
- Backdoor functionality

### Android-Specific Issues

#### Component Security
- **Exported Activities**: Direct access to admin panels
- **Broadcast Receivers**: Intent injection
- **Content Providers**: SQL injection
- **Services**: Unauthorized access

#### Deep Links
- Intent redirection
- Deep link exploitation
- Path traversal via deep links

#### WebView Vulnerabilities
- JavaScript interface exploitation
- File access enabled
- Universal XSS
- WebView takeover

## Backend API Vulnerabilities

### OWASP API Security Top 10

#### API1: Broken Object Level Authorization
- Access other users' account details
- View/modify others' transactions
- IDOR on account numbers
- Transfer funds from any account

#### API2: Broken User Authentication
- JWT secret exposure
- Weak token generation
- Missing token expiration
- Token leakage in logs

#### API3: Excessive Data Exposure
- Verbose error messages
- Unnecessary data in responses
- PII exposure in API calls
- Detailed stack traces

#### API4: Lack of Resources & Rate Limiting
- No rate limiting on login
- Brute force attacks possible
- API abuse scenarios
- Resource exhaustion

#### API5: Broken Function Level Authorization
- Admin API access
- Privilege escalation
- Missing role checks
- Function-level bypass

#### API6: Mass Assignment
- Modify account balance
- Change user roles
- Elevate privileges
- Add admin flags

#### API7: Security Misconfiguration
- CORS misconfiguration
- Debug mode enabled
- Default credentials
- Verbose errors

#### API8: Injection
- SQL injection in transactions
- NoSQL injection
- Command injection
- LDAP injection

#### API9: Improper Assets Management
- Legacy API versions
- Deprecated endpoints
- Undocumented APIs
- Shadow APIs

#### API10: Insufficient Logging
- No audit logs
- Missing security events
- Inadequate monitoring
- No attack detection

### Banking-Specific Vulnerabilities

#### Business Logic Flaws
- **Negative Transfers**: Send negative amounts to increase balance
- **Race Conditions**: Concurrent transaction exploitation
- **Integer Overflow**: Amount manipulation
- **Insufficient Validation**: Missing business rules
- **Transaction Replay**: Replay attacks

#### Financial Vulnerabilities
- Price manipulation
- Insufficient funds check bypass
- Transaction limit bypass
- Interest calculation errors

## Deployment

### Backend Setup
```bash
# Clone repository
git clone https://github.com/rewanthtammana/Damn-Vulnerable-Bank.git
cd Damn-Vulnerable-Bank

# Using Docker (Recommended)
docker-compose up -d

# Manual setup
cd backend
npm install
npm start

# Database setup
mysql -u root -p < setup.sql
```

### Android App Installation
```bash
# Install APK
adb install DamnVulnerableBank.apk

# Configure app to point to backend
# Update API endpoint in app settings
```

## Testing Scenarios

### Scenario 1: Account Enumeration
1. Discover user enumeration vulnerability
2. Enumerate valid account numbers
3. Map customer accounts
4. Identify high-value targets

### Scenario 2: Authentication Bypass
1. Intercept login request
2. Analyze JWT token structure
3. Forge valid tokens
4. Access any user account

### Scenario 3: Privilege Escalation
1. Register as normal user
2. Identify admin endpoints
3. Exploit authorization flaws
4. Gain admin access

### Scenario 4: Fund Transfer Manipulation
1. Initiate legitimate transfer
2. Intercept and modify amount
3. Exploit negative transfer bug
4. Increase account balance

### Scenario 5: Data Exfiltration
1. Extract SQLite database from device
2. Find unencrypted credentials
3. Access all transaction history
4. Extract customer PII

### Scenario 6: MITM Attack
1. Configure SSL proxy
2. Bypass certificate pinning
3. Intercept API traffic
4. Modify transactions in transit

## Testing Tools

### Mobile Testing
- **ADB**: Device interaction
- **Frida**: Runtime instrumentation
- **Objection**: Mobile security toolkit
- **APKTool**: Reverse engineering
- **JADX**: Decompiler

### API Testing
- **Burp Suite**: HTTP proxy and scanner
- **Postman**: API testing
- **curl**: Command-line HTTP client
- **SQLMap**: SQL injection testing

### Database Analysis
- **DB Browser for SQLite**: Database viewer
- **MySQL Workbench**: Backend database
- **DBeaver**: Universal database tool

## Learning Objectives

### For Mobile Developers
- Secure Android development
- Banking app security requirements
- Cryptographic implementations
- Secure data storage
- API security best practices

### For Penetration Testers
- Mobile banking assessment
- Android security testing
- API security testing
- Business logic testing
- Compliance testing (PCI DSS)

### For Security Researchers
- Mobile vulnerability research
- API security patterns
- Banking threat modeling
- Attack chain development

## Compliance Context

### Relevant Standards
- **PCI DSS**: Payment Card Industry
- **OWASP MASVS**: Mobile App Security Verification
- **OWASP ASVS**: Application Security Verification
- **PSD2**: Payment Services Directive
- **GDPR**: Data protection requirements

## Use Cases

### Education & Training
- University mobile security courses
- Corporate security workshops
- Developer security training
- Certification preparation

### Professional Practice
- Penetration testing skills
- Bug bounty preparation
- Security tool validation
- Mobile app assessment methodology

### Research & Development
- Mobile security research
- Banking app vulnerability patterns
- API security research
- Tool development

## Challenge Levels

### Beginner
- Extract hard-coded credentials
- Intercept HTTP traffic
- Access exported activities
- View insecure logs

### Intermediate
- Bypass certificate pinning
- Exploit SQL injection
- IDOR exploitation
- JWT token manipulation

### Advanced
- Business logic bypass
- Race condition exploitation
- Complex attack chains
- Custom exploit development

## Real-World Relevance

Damn Vulnerable Bank mirrors real vulnerabilities found in production banking apps:
- Data storage issues
- API security flaws
- Business logic errors
- Authentication weaknesses
- Authorization bypass

## Remediation Guide

Practice implementing:
- Android Keystore
- Certificate pinning
- Input validation
- Server-side authorization
- Proper cryptography
- Secure session management
- Rate limiting
- Logging and monitoring

Damn Vulnerable Bank provides a comprehensive platform for understanding the full spectrum of mobile banking security, from client-side Android vulnerabilities to backend API security issues, making it essential for anyone working in financial application security.
