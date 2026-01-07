---
layout: vulnerable-lab
title: AllSafe - Intentionally Vulnerable Android App
focus: OWASP Mobile Top 10 vulnerabilities
type: Android APK
category: Android Security
description: Comprehensive vulnerable Android application covering all OWASP Mobile Top 10 vulnerabilities with 14 different security challenges for mobile penetration testing practice.
image: vulnerable-labs/allsafe-android.webp
github: https://github.com/t0thkr1s/allsafe
website: https://github.com/t0thkr1s/allsafe
---

AllSafe is an intentionally vulnerable Android application designed to teach mobile application security by covering all OWASP Mobile Top 10 vulnerabilities through 14 comprehensive challenges.

## Overview

Created as a comprehensive educational platform, AllSafe provides a structured approach to learning Android security, making it ideal for both beginners and experienced security professionals.

## Key Features

- **14 Security Challenges**: Diverse vulnerability scenarios
- **OWASP Mobile Top 10**: Complete coverage
- **Progressive Difficulty**: From beginner to advanced
- **Modern Android**: Current SDK and features
- **Well-Documented**: Clear challenge descriptions
- **Active Community**: Regular updates and support

## Vulnerability Challenges

### 1. Insecure Logging
**Challenge**: Find sensitive information in logs
- **Vulnerability**: Logging sensitive data
- **Tools**: Logcat, ADB
- **Learning**: Proper logging practices
- **Difficulty**: ⭐ Beginner

### 2. Hardcoded Credentials
**Challenge**: Extract hard-coded secrets
- **Vulnerability**: Credentials in source code
- **Tools**: JADX, APKTool
- **Learning**: Secure credential storage
- **Difficulty**: ⭐ Beginner

### 3. Insecure Data Storage
**Challenge**: Access data from SharedPreferences
- **Vulnerability**: Unencrypted local storage
- **Tools**: ADB shell, file explorer
- **Learning**: Encrypted storage, Android Keystore
- **Difficulty**: ⭐⭐ Easy

### 4. Vulnerable Activity Components
**Challenge**: Access exported activities
- **Vulnerability**: Exported components without protection
- **Tools**: ADB, Drozer
- **Learning**: Component security, intent filters
- **Difficulty**: ⭐⭐ Easy

### 5. Insecure Broadcast Receivers
**Challenge**: Exploit broadcast receivers
- **Vulnerability**: Unprotected receivers
- **Tools**: ADB, custom apps
- **Learning**: Receiver permissions, security
- **Difficulty**: ⭐⭐ Easy

### 6. Insecure Content Providers
**Challenge**: SQL injection in content provider
- **Vulnerability**: No input validation
- **Tools**: Drozer, ADB
- **Learning**: Parameterized queries, validation
- **Difficulty**: ⭐⭐⭐ Medium

### 7. Insecure Services
**Challenge**: Exploit bound/unbound services
- **Vulnerability**: Exported services
- **Tools**: ADB, custom client
- **Learning**: Service security, permissions
- **Difficulty**: ⭐⭐ Easy

### 8. Weak Cryptography
**Challenge**: Break weak encryption
- **Vulnerability**: ECB mode, weak algorithms
- **Tools**: Python, cryptographic libraries
- **Learning**: Strong encryption practices
- **Difficulty**: ⭐⭐⭐ Medium

### 9. Insecure WebView
**Challenge**: Exploit WebView vulnerabilities
- **Vulnerability**: JavaScript enabled, file access
- **Tools**: Browser, custom HTML
- **Learning**: Secure WebView configuration
- **Difficulty**: ⭐⭐⭐ Medium

### 10. Root Detection Bypass
**Challenge**: Bypass root detection
- **Vulnerability**: Client-side security
- **Tools**: Frida, Magisk Hide
- **Learning**: Runtime manipulation, limitations
- **Difficulty**: ⭐⭐⭐⭐ Hard

### 11. Emulator Detection Bypass
**Challenge**: Bypass emulator checks
- **Vulnerability**: Detection evasion
- **Tools**: Frida, Xposed
- **Learning**: Environment detection limits
- **Difficulty**: ⭐⭐⭐ Medium

### 12. Debuggable Application
**Challenge**: Debug and manipulate the app
- **Vulnerability**: android:debuggable="true"
- **Tools**: Android Studio, jdb
- **Learning**: Production build security
- **Difficulty**: ⭐⭐ Easy

### 13. Insufficient Certificate Validation
**Challenge**: Man-in-the-middle attack
- **Vulnerability**: Trusts all certificates
- **Tools**: Burp Suite, mitmproxy
- **Learning**: Certificate pinning, validation
- **Difficulty**: ⭐⭐⭐ Medium

### 14. Arbitrary Code Execution
**Challenge**: Achieve code execution
- **Vulnerability**: Dynamic code loading
- **Tools**: Custom payloads
- **Learning**: Secure coding, validation
- **Difficulty**: ⭐⭐⭐⭐⭐ Expert

## OWASP Mobile Top 10 Coverage

### M1: Improper Platform Usage
- Debuggable application
- Misuse of Android features

### M2: Insecure Data Storage
- SharedPreferences vulnerabilities
- Insecure file storage
- SQLite without encryption

### M3: Insecure Communication
- Certificate validation bypass
- Cleartext traffic
- MITM vulnerabilities

### M4: Insecure Authentication
- Hard-coded credentials
- Weak session management

### M5: Insufficient Cryptography
- Weak encryption algorithms
- ECB mode usage
- Predictable keys

### M6: Insecure Authorization
- Exported components
- Missing permission checks

### M7: Client Code Quality
- Code injection
- Arbitrary code execution

### M8: Code Tampering
- Root detection bypass
- Integrity check circumvention

### M9: Reverse Engineering
- Emulator detection bypass
- Lack of obfuscation

### M10: Extraneous Functionality
- Insecure logging
- Debug features in production

## Testing Environment

### Prerequisites
```bash
# Android device or emulator
# Minimum: Android 7.0 (API 24)
# Recommended: Android 10+ (API 29+)

# Required tools
- Android SDK
- ADB
- Burp Suite
- Frida
```

### Installation
```bash
# Download latest release
wget https://github.com/t0thkr1s/allsafe/releases/latest/download/allsafe.apk

# Install via ADB
adb install allsafe.apk

# Launch application
adb shell am start -n com.example.allsafe/.MainActivity
```

## Recommended Tools

### Static Analysis
- **JADX-GUI**: Decompile and browse code
- **APKTool**: Decode resources
- **MobSF**: Automated analysis
- **Bytecode Viewer**: Multiple decompilers

### Dynamic Analysis
- **Frida**: Runtime instrumentation
  ```bash
  pip install frida-tools
  frida -U -f com.example.allsafe
  ```
- **Objection**: Frida-based toolkit
  ```bash
  pip install objection
  objection -g com.example.allsafe explore
  ```
- **Drozer**: Android security framework
- **Xposed Framework**: Runtime hooks

### Network Analysis
- **Burp Suite**: HTTPS interception
- **Wireshark**: Packet capture
- **tcpdump**: Network monitoring

### Debugging
- **Android Studio**: Full debugging
- **jdb**: Command-line debugger
- **ADB**: Device interaction

## Learning Path

### Week 1: Basics
- Insecure logging
- Hard-coded credentials
- Debuggable application
- Insecure data storage

### Week 2: Components
- Exported activities
- Broadcast receivers
- Content providers
- Services

### Week 3: Advanced
- WebView vulnerabilities
- Weak cryptography
- Certificate validation
- MITM attacks

### Week 4: Expert
- Root detection bypass
- Emulator detection bypass
- Code injection
- Arbitrary code execution

## Use Cases

### Education
- **University Courses**: Mobile security curriculum
- **Training Programs**: Corporate security training
- **Workshops**: Hands-on security sessions
- **Self-Study**: Individual learning

### Professional Development
- **Certification Prep**: eMAPT, GMOB preparation
- **Bug Bounty**: Mobile vulnerability practice
- **Penetration Testing**: Skill development
- **Security Research**: Vulnerability exploration

### Tool Development
- Test mobile security scanners
- Validate detection capabilities
- Develop exploitation tools
- Build security frameworks

## Challenge Solutions

Hints and solutions available:
- GitHub wiki
- Community writeups
- Video walkthroughs
- Interactive tutorials

## Best Practices Learned

### Secure Development
- Encrypt sensitive data
- Validate all inputs
- Minimize exposed components
- Implement certificate pinning
- Use Android Keystore
- Disable debugging in production
- Implement proper logging

### Security Testing
- Static and dynamic analysis
- Network traffic inspection
- Component security testing
- Runtime manipulation
- Reverse engineering
- Threat modeling

## Community

- Active GitHub repository
- Regular updates
- Community contributions
- Support via issues
- Educational resources

AllSafe provides a comprehensive, structured approach to learning Android security, making it an essential resource for anyone serious about mobile application security.
