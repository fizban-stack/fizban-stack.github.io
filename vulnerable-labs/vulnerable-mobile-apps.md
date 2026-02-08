---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Vulnerable Mobile Apps for Penetration Testing
focus: Comprehensive collection of vulnerable Android applications
type: Android APK Collection
category: Android Security
description: A curated collection of intentionally vulnerable Android applications for mobile security testing, covering OWASP Mobile Top 10 and various Android-specific vulnerabilities.
image: vulnerable-labs/vulnerable-mobile-apps.webp
github: https://github.com/riddhi-shree/nullCommunity/tree/master/Mobile
website: https://github.com/riddhi-shree/nullCommunity
---

Vulnerable Mobile Apps for Penetration Testing is a comprehensive collection of intentionally vulnerable Android applications curated for mobile security testing and training.

## Overview

This repository provides security professionals and students with a wide variety of vulnerable Android applications to practice mobile penetration testing techniques. The collection includes apps covering OWASP Mobile Top 10 vulnerabilities across multiple domains including banking, e-commerce, social media, messaging, IoT companion apps, and enterprise applications.

## Key Features

- **Multi-App Collection**: Diverse set of vulnerable Android applications
- **OWASP Mobile Top 10 Coverage**: All ten categories represented across the collection
- **Multiple Domains**: Banking, e-commerce, social media, messaging, IoT, and enterprise apps
- **Varied Difficulty**: Challenges ranging from beginner static analysis to advanced native library reverse engineering
- **Community-Driven**: Regularly updated with new applications and contributions
- **Broad Attack Surface**: Covers data storage, communication, authentication, components, and code security

## Getting Started

```bash
git clone https://github.com/riddhi-shree/nullCommunity.git
cd nullCommunity/Mobile
adb install <app-name>.apk
```

## Vulnerability Categories

- Insecure Data Storage (SQLite, SharedPreferences, External Storage)
- Cleartext HTTP Traffic and Certificate Pinning Bypass
- Weak Authentication and Insecure Token Storage
- Exported Components and Intent Injection
- Content Provider SQL Injection
- Deep Link Exploitation
- Insecure WebView Implementations
- Root Detection and Emulator Detection Bypass
- Weak Cryptography and Hardcoded Credentials
- Debuggable Applications and Backup Flag Issues
- Dynamic Code Loading and Native Library Vulnerabilities
- Code Tampering and Missing Integrity Checks

## Use Cases

- **Mobile Security Training**: Penetration testing courses and OWASP Mobile Top 10 workshops
- **Certification Preparation**: Practice for eMAPT, GMOB, and related exams
- **Bug Bounty Preparation**: Build mobile vulnerability hunting skills
- **Academic Use**: University courses, research projects, and student competitions
- **Tool Development**: Test and validate mobile security scanners
