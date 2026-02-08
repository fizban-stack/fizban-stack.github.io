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

GOAD represents one of the most sophisticated publicly available Active Directory lab environments, simulating a realistic enterprise network with complex domain relationships and numerous vulnerabilities. It offers multiple lab sizes -- GOAD (5 VMs), GOAD-Light (3 VMs), and GOAD-Mini (2 VMs) -- to fit different hardware capabilities, and supports deployment on VirtualBox, VMware, Proxmox, Azure, and AWS.

## Key Features

- **150+ Attack Paths**: Comprehensive coverage of AD attack techniques
- **Multiple Domains and Forests**: 5 domains with inter-forest trust relationships
- **Multiple Lab Sizes**: Full, Light, and Mini variants for different hardware
- **Fully Automated Deployment**: Vagrant, Terraform, and Ansible provisioning
- **Multi-Platform Support**: VirtualBox, VMware, Proxmox, Azure, AWS
- **Realistic Topology**: Enterprise-like domain structure with DCs, member servers, and SQL servers

## Deployment

```bash
# Using Vagrant + VirtualBox
git clone https://github.com/Orange-Cyberdefense/GOAD.git
cd GOAD
vagrant up

# Also supports Terraform + Proxmox and Ansible configuration
# RAM: 32GB+ recommended (16GB for GOAD-Light)
```

## Vulnerability Categories

- LLMNR/NBT-NS Poisoning and SMB Relay
- Password Spraying and AS-REP Roasting
- Kerberoasting and DCSync
- NTDS.dit Extraction and LSASS Dumping
- Pass-the-Hash, Pass-the-Ticket, and Overpass-the-Hash
- Lateral Movement (PSExec, WMI, WinRM, DCOM, RDP)
- ACL Abuse and Delegation Exploitation
- ADCS Certificate Attacks
- GPO Modification and LAPS Password Reading
- Golden Ticket, Silver Ticket, and Diamond Ticket Attacks
- DCShadow and AdminSDHolder Abuse
- Cross-Domain Trust Exploitation and SID History Injection
- Persistence via ACL Backdoors, Certificate Templates, and Custom SSPs

## Use Cases

- **Red Team Training**: Advanced AD attacks, multi-domain compromise, and persistence techniques
- **Blue Team Training**: Attack detection, log analysis, incident response, and threat hunting
- **Purple Team Exercises**: Detection development, rule creation, and control validation
- **Certification Preparation**: CRTP, CRTE, OSEP, and enterprise security certifications
- **Tool Development**: Test BloodHound, Mimikatz, Rubeus, Impacket, and other AD tools
