---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: Ludus
focus: Automated cyber range deployment and management
type: Lab Platform
category: Enterprise & Active Directory
description: Open-source infrastructure automation platform for deploying complex cyber labs on Proxmox. Features pre-built environments including GOAD, ADCS, Elastic Security, Malware Labs, and more with WireGuard remote access.
image: blog/ludus/ludus.webp
github: https://gitlab.com/badsectorlabs/ludus
website: https://ludus.cloud
---

Ludus is an open-source, API-driven infrastructure management platform created by Bad Sector Labs that automates the deployment of complex cyber lab environments on Proxmox.

## Overview

Built on Proxmox and leveraging Packer and Ansible, Ludus transforms what would normally be hours or days of manual configuration into a single YAML file and a few commands. It targets security professionals, QA teams, developers, and red/blue team operators seeking faster infrastructure provisioning.

## Key Features

### Automated Deployment
- Deploy complex networks with a single command
- YAML-based configuration
- Infrastructure-as-code approach
- Reproducible and shareable lab configurations

### Template System
- Templates built from scratch using ISO files
- Builtin: Debian 11/12, Kali Linux, Windows 11, Windows Server 2022
- Community: Windows 10, Server 2012 R2/2016/2019, Rocky 9, Ubuntu
- Specialized: Commando VM, FLARE VM, REMnux

### Network and Connectivity
- Up to 255 VLANs with customizable firewall rules
- Internal DNS with domain rewrite capabilities
- Direct access via SSH, RDP, VNC, or KasmVNC
- Built-in WireGuard server for secure remote access

### Security and OPSEC
- VM isolation from internet connectivity
- Snapshot management before/after isolation
- Selective domain/IP allowlisting
- Telemetry containment capabilities

## Pre-Built Environment Guides

### Active Directory Labs
- **Game of Active Directory (GOAD)** - Comprehensive AD lab with 150+ attack paths
- **GOAD - NHA** - Network variant
- **GOAD - SCCM** - Includes System Center Configuration Manager
- **Basic Active Directory Network** - Simpler setup for beginners
- **ADCS** - Certificate Services attacks
- **SANS Workshop: Active Directory** - Based on SANS training materials

### CTF and Workshop Labs
- **BarbHack CTF 2024** - Gotham City themed AD CTF
- **Netexec Workshop (leHACK 2024/2025)** - Lateral movement and credential testing

### Security Research Labs
- **Malware Lab (xz backdoor)** - CVE-2024-3094 analysis environment
- **Elastic Security** - SIEM and blue team training
- **Pivot Lab** - Network pivoting techniques

## Installation on Proxmox

### System Requirements
- x86_64 CPU with Passmark score exceeding 6,000
- Debian 12/13 or Proxmox 8/9 host
- Minimum 32GB RAM per user/range
- At least 200GB storage initially
- Wired internet connectivity

### Quick Install
```bash
curl -s https://ludus.cloud/install | bash
```

### Verify Script First
```bash
curl https://ludus.cloud/install > install.sh
cat install.sh
chmod +x install.sh
./install.sh
```

### What Gets Installed
- Files extracted to `/opt/ludus`
- Packages: ansible, packer, dnsmasq, sshpass, curl, jq, iptables-persistent
- Python packages: proxmoxer, requests, netaddr, pywinrm, dnspython, jmespath
- Proxmox groups, pools, networking interfaces, and system services

## Use Cases

### Red Team Training
- Practice AD attack chains
- Test exploitation techniques
- Develop custom attack scenarios

### Blue Team Training
- Detection engineering with Elastic Security
- Incident response practice
- SIEM query development

### CTF Preparation
- Deploy challenge environments quickly
- Practice specific vulnerability classes
- Test tooling and techniques

### Security Research
- Malware analysis in isolated environments
- Vulnerability research
- Tool development and testing

## Learning Path

1. **Install Ludus** on Proxmox following the quick start guide
2. **Build Templates** for your required operating systems
3. **Deploy GOAD** or Basic AD Network to start practicing
4. **Connect via WireGuard** for remote lab access
5. **Explore Other Labs** as your skills progress
6. **Create Custom Ranges** for specific scenarios

## Documentation Resources

- [Official Documentation](https://docs.ludus.cloud)
- [GitLab Repository](https://gitlab.com/badsectorlabs/ludus)
- [Environment Guides](https://docs.ludus.cloud/docs/category/environment-guides)
- Discord community for support

Ludus is an essential tool for anyone running a homelab focused on security research, CTF practice, or professional development in cybersecurity.
