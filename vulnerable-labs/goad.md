---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Game of Active Directory
focus: Active Directory attack and defense techniques
type: Lab Environment
category: Enterprise & Active Directory
description: A fully automated AD lab deployment with multiple domains and forests, featuring 150+ attack paths for advanced AD security training.
image: vulnerable-labs/goad.webp
github: https://github.com/Orange-Cyberdefense/GOAD
website: https://github.com/Orange-Cyberdefense/GOAD
---

GOAD (Game of Active Directory) is Orange Cyberdefense's advanced vulnerable Active Directory lab featuring multiple domains, trusts, and over 150 attack paths for comprehensive AD security training.

## Overview

GOAD represents one of the most sophisticated publicly available Active Directory lab environments, simulating a realistic enterprise network with complex domain relationships and numerous vulnerabilities.

## Lab Architecture

### Domains and Forests
- **Multiple Domains**: 5 different domains
- **Forest Trusts**: Inter-forest relationships
- **Domain Trusts**: Various trust configurations
- **Realistic Topology**: Enterprise-like structure

### Servers (Total: 5 VMs)
- **Domain Controllers**: Multiple DCs across domains
- **Member Servers**: Application and file servers
- **SQL Servers**: Database services
- **Exchange Server**: Mail infrastructure (in some variants)

### Lab Variants

GOAD offers different sizes:
- **GOAD**: Full 5-machine environment
- **GOAD-Light**: Smaller footprint (3 machines)
- **GOAD-Mini**: Minimal setup (2 machines)

## Attack Paths (150+)

### Initial Access
- LLMNR/NBT-NS poisoning
- Password spraying
- AS-REP Roasting
- SMB relay attacks
- Responder attacks

### Discovery & Enumeration
- BloodHound data collection
- Domain trust enumeration
- Service account discovery
- Share enumeration
- GPO enumeration
- LDAP queries

### Credential Access
- **Kerberoasting**: Service account attacks
- **AS-REP Roasting**: Pre-authentication disabled
- **DCSync**: Directory replication
- **NTDS.dit Extraction**: Database dumping
- **LSASS Dumping**: Memory credential theft
- **GPP Passwords**: Group Policy Preferences
- **DPAPI Abuse**: Data Protection API
- **Credential Manager**: Windows vault

### Lateral Movement
- Pass-the-Hash (PtH)
- Pass-the-Ticket (PtT)
- Overpass-the-Hash
- PSExec, WMI, WinRM
- DCOM lateral movement
- RDP pass-through
- SQL server links

### Privilege Escalation
- **ACL Abuse**: Exploiting permissions
- **Delegation Issues**: Constrained/unconstrained
- **Certificate Services**: ADCS attacks
- **Group Policy Objects**: GPO modification
- **LAPS**: Password reading
- **Print Nightmare**: CVE-2021-34527
- **WSUS Attacks**: Update server abuse

### Domain Dominance
- Golden Ticket attacks
- Silver Ticket attacks
- Diamond Ticket attacks
- DCShadow
- AdminSDHolder abuse
- Skeleton Key malware
- DSRM password abuse

### Cross-Domain Attacks
- Trust key extraction
- SID history injection
- Forest-to-forest attacks
- Foreign security principals
- Selective authentication bypass

### Persistence Mechanisms
- ACL backdoors
- GPO backdoors
- Certificate template abuse
- SSPI hooks
- Custom SSP
- Directory service restoration mode

## Deployment Options

### Automated Deployment
```bash
# Using Vagrant + VirtualBox
git clone https://github.com/Orange-Cyberdefense/GOAD.git
cd GOAD
vagrant up

# Using Terraform + Proxmox
# Using Ansible for configuration
```

### Supported Platforms
- **VirtualBox**: Local virtualization
- **VMware**: Enterprise virtualization
- **Proxmox**: Open-source hypervisor
- **Azure**: Cloud deployment
- **AWS**: Cloud deployment (community)

### System Requirements
- **RAM**: 32GB+ recommended (16GB for GOAD-Light)
- **Storage**: 100GB+
- **CPU**: Multi-core processor
- **Virtualization**: Hardware virtualization enabled

## Tools to Practice

### Offensive Tools
- **BloodHound**: Attack path analysis
- **Mimikatz**: Credential extraction
- **PowerView**: AD enumeration
- **Rubeus**: Kerberos abuse
- **Impacket**: Protocol attacks
- **CrackMapExec**: Swiss army knife
- **Certipy**: Certificate attacks
- **Coercer**: Forced authentication

### Defensive Tools
- **Sysmon**: System monitoring
- **Velociraptor**: Endpoint visibility
- **Microsoft Defender**: EDR
- **Event log analysis**: Attack detection
- **Honeytokens**: Deception

## Learning Objectives

1. **Understand AD Architecture**: Complex enterprise structures
2. **Master Attack Techniques**: 150+ different paths
3. **Practice Tool Usage**: Industry-standard tools
4. **Develop Attack Chains**: Multi-step compromises
5. **Learn Detection**: Blue team perspective
6. **Forest/Domain Trusts**: Complex relationships

## Use Cases

### Red Team Training
- Advanced AD attacks
- Multi-domain compromise
- Trust relationship abuse
- Persistence mechanisms

### Blue Team Training
- Attack detection
- Log analysis
- Incident response
- Threat hunting

### Purple Team Exercises
- Detection development
- Rule creation
- Gap identification
- Control validation

### Research & Development
- New attack techniques
- Tool development
- Detection research
- Academic studies

## Documentation

GOAD provides extensive documentation:
- Installation guides
- Attack path walkthroughs
- BloodHound pre-built queries
- Configuration details
- Troubleshooting guides

## Community

- Active GitHub repository
- Regular updates
- Community contributions
- Conference presentations
- Training materials

## What Makes GOAD Special

1. **Scale**: 150+ attack paths
2. **Complexity**: Multiple domains and forests
3. **Realism**: Enterprise-like configuration
4. **Automation**: Fully automated deployment
5. **Flexibility**: Multiple size variants
6. **Active Development**: Regular updates
7. **Free & Open Source**: Community-driven

## Comparison to Other AD Labs

- **More Complex than Vulnerable-AD**: Multiple domains
- **More Realistic than DetectionLab**: Complex trusts
- **Enterprise-Scale**: Mirrors large organizations
- **Attack Path Variety**: 3x more than typical labs

GOAD is one of the most comprehensive publicly available Active Directory training labs, offering exceptional complexity and realism for serious AD security practitioners. Whether you're preparing for CRTP, CRTE, OSEP, or working in enterprise security, GOAD provides an invaluable training platform.
