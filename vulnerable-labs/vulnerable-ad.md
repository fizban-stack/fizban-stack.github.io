---
layout: vulnerable-lab
title: Vulnerable-AD
focus: Active Directory security and exploitation
type: Lab Environment
category: Enterprise & Active Directory
description: A fully configured Active Directory lab with multiple vulnerabilities including Kerberoasting, credential dumping, lateral movement, and domain privilege escalation paths.
image: vulnerable-labs/vulnerable-ad.webp
github: https://github.com/WazeHell/vulnerable-AD
website: https://github.com/WazeHell/vulnerable-AD
---

Vulnerable-AD is a fully functional Active Directory lab environment designed to practice AD penetration testing techniques in a safe, realistic setting.

## Overview

This project provides an automated way to build a vulnerable Active Directory domain with multiple machines, users, and misconfigured security settings that simulate real-world enterprise environments.

## Lab Components

- **Domain Controller**: Windows Server with AD DS
- **Member Servers**: Multiple vulnerable systems
- **Workstations**: User endpoints
- **Service Accounts**: Misconfigured service principals
- **Group Policies**: Vulnerable configurations

## Covered Attack Techniques

### Initial Access
- LLMNR/NBT-NS poisoning
- SMB relay attacks
- Password spraying
- Phishing simulations

### Discovery & Enumeration
- Domain enumeration
- BloodHound data collection
- User and group discovery
- Share enumeration

### Credential Access
- Kerberoasting
- AS-REP Roasting
- DCSync attacks
- NTDS.dit extraction
- LSASS dumping
- GPP password extraction

### Lateral Movement
- Pass-the-Hash
- Pass-the-Ticket
- Overpass-the-Hash
- PSExec/WMI/WinRM
- RDP hijacking

### Privilege Escalation
- Domain Admin path
- ACL abuse
- Delegation issues
- Group Policy Objects
- Certificate Services attacks

### Persistence
- Golden Ticket
- Silver Ticket
- DCShadow
- AdminSDHolder

## Deployment

```bash
# Clone repository
git clone https://github.com/WazeHell/vulnerable-AD

# Follow setup instructions for:
# - VirtualBox/VMware
# - Network configuration
# - Automated deployment scripts
```

## Tools to Practice

- **BloodHound**: AD attack path mapping
- **Mimikatz**: Credential extraction
- **PowerView**: AD enumeration
- **Rubeus**: Kerberos abuse
- **Impacket**: Protocol attacks
- **CrackMapExec**: Swiss army knife

## Learning Objectives

- Understand AD architecture
- Master attack techniques
- Practice detection evasion
- Learn defensive strategies
- Develop exploitation skills

## Use Cases

- Active Directory penetration testing training
- Red team exercise practice
- Blue team detection development
- CRTP/CRTE certification prep
- Security tool testing

This lab is invaluable for anyone working in enterprise security, especially those focused on Windows environments and Active Directory security.
