---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
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

Created as a comprehensive educational platform, AllSafe provides a structured approach to learning Android security with progressive difficulty levels ranging from beginner to expert. Each challenge targets a specific vulnerability class, including insecure logging, hardcoded credentials, insecure data storage, exported components, weak cryptography, WebView exploitation, root/emulator detection bypass, certificate validation issues, and arbitrary code execution.

## Key Features

- **14 Security Challenges**: Diverse vulnerability scenarios with progressive difficulty
- **OWASP Mobile Top 10**: Complete coverage of all categories
- **Modern Android**: Current SDK and features
- **Well-Documented**: Clear challenge descriptions
- **Active Community**: Regular updates and support
- **Beginner-Friendly**: Challenges range from basic log analysis to expert-level code execution

## Getting Started

```bash
# Download and install
wget https://github.com/t0thkr1s/allsafe/releases/latest/download/allsafe.apk
adb install allsafe.apk
adb shell am start -n com.example.allsafe/.MainActivity
```

## Vulnerability Categories

- Insecure Logging of Sensitive Data
- Hardcoded Credentials in Source Code
- Insecure Data Storage (SharedPreferences, SQLite)
- Exported Activities, Broadcast Receivers, Content Providers, and Services
- Weak Cryptography (ECB mode, weak algorithms)
- Insecure WebView Configuration (JavaScript enabled, file access)
- Root Detection and Emulator Detection Bypass
- Debuggable Application Flag
- Insufficient Certificate Validation (MITM)
- Arbitrary Code Execution via Dynamic Code Loading
- Missing Code Obfuscation
- Debug Features in Production

## Use Cases

- **University Courses**: Mobile security curriculum and hands-on labs
- **Certification Preparation**: eMAPT, GMOB exam practice
- **Bug Bounty Practice**: Mobile vulnerability hunting skills
- **Penetration Testing**: Android security assessment skill development
- **Tool Validation**: Test mobile security scanners and detection capabilities
