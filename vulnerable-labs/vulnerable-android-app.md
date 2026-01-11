---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Vulnerable Android Application
focus: Android security fundamentals and exploitation
type: Android APK
category: Android Security
description: Educational vulnerable Android app covering basic to advanced Android security concepts including reversing, runtime manipulation, and common mobile vulnerabilities.
image: vulnerable-labs/vulnerable-android-app.webp
github: https://github.com/Lance0312/VulnerableAndroidAppOracle
website: https://github.com/Lance0312/VulnerableAndroidAppOracle
---

Vulnerable Android Application is an educational Android app designed to teach mobile security fundamentals through practical, hands-on exploitation of common Android vulnerabilities.

## Overview

This application provides a structured learning path from basic Android security concepts to advanced exploitation techniques, making it suitable for both beginners and those looking to deepen their mobile security knowledge.

## Application Purpose

Created as an educational tool to demonstrate:
- Common Android security pitfalls
- Reverse engineering techniques
- Runtime manipulation methods
- Secure development practices
- Mobile penetration testing methodology

## Vulnerability Categories

### Information Disclosure

#### Insecure Logging
- **Vulnerability**: Sensitive data in system logs
- **Location**: Throughout application
- **Tools**: Logcat, ADB
- **Impact**: Credentials, tokens, PII exposure
- **Exploitation**:
  ```bash
  adb logcat | grep -i "password\|token\|secret"
  ```

#### Debug Information
- Debug mode enabled
- Stack traces exposure
- Verbose error messages
- Development endpoints

### Insecure Data Storage

#### SharedPreferences
- **Vulnerability**: Cleartext data storage
- **Location**: `/data/data/com.app/shared_prefs/`
- **Impact**: Credentials, session tokens
- **Extraction**:
  ```bash
  adb shell
  run-as com.vulnerable.app
  cat shared_prefs/app_preferences.xml
  ```

#### SQLite Databases
- Unencrypted databases
- Sensitive data in tables
- SQL injection points
- World-readable databases

#### External Storage
- Sensitive files on SD card
- World-readable permissions
- Temp file exposure
- Cache data leakage

### Weak Cryptography

#### Hard-coded Keys
- **Vulnerability**: Encryption keys in source
- **Finding**: Decompile and search
- **Tools**: JADX, grep
- **Impact**: Decrypt all user data

#### Weak Algorithms
- MD5 for passwords
- DES encryption
- Custom crypto (always broken)
- Base64 "encryption"

#### Implementation Flaws
- ECB mode usage
- Static IV
- Weak key derivation
- Predictable random

### Component Security

#### Exported Activities
- **Vulnerability**: Public activities
- **AndroidManifest.xml**: `android:exported="true"`
- **Exploitation**:
  ```bash
  adb shell am start -n com.app/.AdminActivity
  ```

#### Broadcast Receivers
- Unprotected receivers
- Intent spoofing
- Data injection
- Unauthorized triggers

#### Content Providers
- SQL injection
- Path traversal
- Unauthorized data access
- Missing permissions

#### Services
- Exported services
- Unprotected IPC
- Privilege escalation
- Resource exhaustion

### Authentication & Authorization

#### Authentication Bypass
- Client-side validation only
- Hard-coded credentials
- Insecure password reset
- Session management flaws

#### Authorization Issues
- Missing server-side checks
- IDOR vulnerabilities
- Horizontal privilege escalation
- Role-based access bypass

### Code Injection

#### WebView Vulnerabilities
- JavaScript enabled
- File access enabled
- addJavascriptInterface abuse
- XSS attacks

#### Dynamic Code Loading
- Loading untrusted code
- DEX injection
- Native library loading
- Class loader manipulation

### Network Security

#### Insecure Communication
- Cleartext HTTP
- No certificate pinning
- Weak TLS versions
- Hostname verification disabled

#### API Security
- Hard-coded API keys
- Insecure endpoints
- Missing authentication
- Token exposure

### Reverse Engineering

#### Lack of Protection
- No obfuscation
- Readable source
- Debugging enabled
- No integrity checks

#### Root Detection
- Basic checks
- Easily bypassed
- Su binary detection
- Test-keys detection

## Testing Challenges

### Challenge 1: Extract Hard-coded Credentials
**Objective**: Find admin credentials in source code
- Decompile APK
- Search for string patterns
- Locate authentication logic
- Extract credentials

### Challenge 2: Bypass Root Detection
**Objective**: Run app on rooted device
- Identify root check function
- Use Frida to hook detection
- Bypass runtime checks
- Verify bypass success

### Challenge 3: SQL Injection
**Objective**: Extract all user data
- Find input points
- Test for SQL injection
- Craft injection payload
- Extract database

### Challenge 4: Intent Manipulation
**Objective**: Access admin functionality
- Map exported components
- Craft malicious intents
- Launch restricted activities
- Exploit intent extras

### Challenge 5: Traffic Interception
**Objective**: Capture and modify API requests
- Configure proxy
- Bypass certificate pinning
- Intercept traffic
- Modify requests/responses

## Testing Environment

### Device Setup
```bash
# Rooted Android device recommended
# Android 7.0+ (API 24+)

# Install required tools
adb install VulnerableApp.apk

# Grant necessary permissions
adb shell pm grant com.vulnerable.app android.permission.READ_EXTERNAL_STORAGE
adb shell pm grant com.vulnerable.app android.permission.WRITE_EXTERNAL_STORAGE
```

### Network Setup
```bash
# Configure Burp Suite
# Export Burp certificate as DER
# Convert and install on device

openssl x509 -inform DER -in burp.der -out burp.pem
openssl x509 -inform PEM -subject_hash_old -in burp.pem | head -1
mv burp.pem <hash>.0
adb root
adb push <hash>.0 /system/etc/security/cacerts/
adb reboot
```

## Recommended Tools

### Reverse Engineering
- **JADX**: Modern decompiler
- **APKTool**: Resource extraction
- **Bytecode Viewer**: Multiple decompilers
- **dex2jar**: DEX to JAR conversion
- **JD-GUI**: Java decompiler

### Dynamic Analysis
- **Frida**: Runtime instrumentation
  ```javascript
  Java.perform(function() {
      var MainActivity = Java.use("com.app.MainActivity");
      MainActivity.isRooted.implementation = function() {
          console.log("Root check bypassed");
          return false;
      };
  });
  ```

- **Objection**: Frida-based toolkit
  ```bash
  objection -g com.vulnerable.app explore
  android hooking watch class_method com.app.MainActivity.checkRoot
  ```

### Network Analysis
- **Burp Suite**: HTTPS proxy
- **mitmproxy**: Command-line proxy
- **Wireshark**: Packet analysis

### Database Tools
- **DB Browser for SQLite**: GUI browser
- **sqlitebrowser**: Alternative GUI
- **sqlite3**: Command-line tool

## Learning Path

### Week 1: Reconnaissance
- Install and explore app
- Decompile APK
- Review AndroidManifest.xml
- Map attack surface

### Week 2: Static Analysis
- Code review
- Find hard-coded secrets
- Identify cryptographic issues
- Locate injection points

### Week 3: Dynamic Analysis
- Setup Frida
- Hook functions
- Bypass protections
- Runtime manipulation

### Week 4: Network Testing
- Configure proxy
- Bypass SSL pinning
- Intercept traffic
- API testing

### Week 5: Exploitation
- Chain vulnerabilities
- Develop exploits
- Document findings
- Practice reporting

## Educational Value

### For Beginners
- Introduction to Android architecture
- Basic reverse engineering
- Mobile security concepts
- Tool usage practice

### For Intermediate
- Advanced exploitation
- Frida scripting
- Vulnerability chaining
- Custom tool development

### For Advanced
- Zero-day discovery
- Novel exploitation techniques
- Security research
- Defense mechanism bypass

## Use Cases

### Academic
- University mobile security courses
- Student labs and assignments
- Research projects
- Thesis work

### Professional
- **Certification Prep**: eMAPT, GMOB, OSCP-Mobile
- **Penetration Testing**: Skill development
- **Bug Bounty**: Practice platform
- **Tool Development**: Testing environment

### Corporate
- Security awareness training
- Developer security education
- Secure coding workshops
- Team building exercises

## Remediation Examples

The app can be used to practice implementing:
- Android Keystore integration
- Certificate pinning
- Input validation
- Secure component configuration
- Proper cryptography
- Network security configuration

## Best Practices Learned

### Security
- Never log sensitive data
- Encrypt local storage
- Use Android Keystore
- Implement certificate pinning
- Validate all inputs
- Minimize exported components
- Disable debugging in production

### Development
- Follow OWASP MASVS
- Security testing in SDLC
- Code reviews
- Penetration testing
- Secure coding standards

This vulnerable application serves as an excellent entry point for learning Android security, providing a comprehensive platform for understanding and exploiting mobile vulnerabilities in a safe, educational environment.
