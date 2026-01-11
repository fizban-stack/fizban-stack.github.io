---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Metasploitable3
focus: Enterprise server and Active Directory vulnerabilities
type: Virtual Machine
category: Enterprise & Active Directory
description: Rapid7's third generation vulnerable VM supporting Windows and Ubuntu, designed for testing Metasploit and practicing enterprise penetration testing.
image: vulnerable-labs/metasploitable3.webp
github: https://github.com/rapid7/metasploitable3
website: https://github.com/rapid7/metasploitable3
---

Metasploitable3 is Rapid7's third iteration of their intentionally vulnerable virtual machine platform, featuring both Windows and Linux targets for penetration testing practice.

## Overview

Built with Packer and Vagrant, Metasploitable3 provides a realistic vulnerable enterprise environment for testing Metasploit Framework and other penetration testing tools.

## Available Targets

### Windows Server 2008
- **Services**: IIS, MySQL, FTP, SMB
- **Vulnerabilities**: 15+ exploitable services
- **Use Case**: Windows enterprise testing

### Ubuntu 14.04
- **Services**: Apache, MySQL, FTP, IRC
- **Vulnerabilities**: 20+ exploitable services
- **Use Case**: Linux server testing

## Key Features

- **Automated Building**: Packer templates
- **Version Control**: Consistent environment
- **Multiple Vulnerabilities**: Network and application layer
- **Metasploit Integration**: Purpose-built for MSF
- **Realistic Scenarios**: Enterprise-like configuration

## Deployment

```bash
# Install dependencies
# Vagrant, VirtualBox/VMware, Packer

# Build Windows target
packer build windows_2008_r2.json
vagrant box add metasploitable3-win2k8 metasploitable3-win2k8.box
vagrant up

# Build Ubuntu target
packer build ubuntu_1404.json
vagrant box add metasploitable3-ub1404 metasploitable3-ub1404.box
vagrant up
```

## Vulnerability Categories

### Network Services
- SMB/CIFS vulnerabilities
- FTP anonymous access
- SSH weak configurations
- Telnet exposure
- RDP misconfigurations

### Web Applications
- SQL injection
- Command injection
- File inclusion
- Directory traversal
- Authentication bypasses

### Privilege Escalation
- Kernel exploits
- Misconfigured permissions
- Weak credentials
- Service misconfigurations

### Database Vulnerabilities
- MySQL root access
- Weak passwords
- Remote access enabled
- Injection vulnerabilities

## Learning Path

1. **Reconnaissance**: Service discovery and enumeration
2. **Exploitation**: Initial access techniques
3. **Privilege Escalation**: Elevate to system/root
4. **Post-Exploitation**: Persistence and pivoting
5. **Reporting**: Document findings

## Use Cases

- **Metasploit Training**: Practice using MSF modules
- **OSCP Preparation**: Similar to exam machines
- **Tool Development**: Test exploit scripts
- **Security Training**: Corporate training labs
- **Certification Prep**: CEH, CompTIA Pentest+

## Comparison to Metasploitable 2

- More realistic configurations
- Current OS versions
- Additional vulnerable services
- Better documentation
- Automated building process

Metasploitable3 remains a cornerstone resource for anyone learning penetration testing or preparing for security certifications.
