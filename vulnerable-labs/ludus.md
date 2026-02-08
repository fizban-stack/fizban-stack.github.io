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

- **Automated Deployment**: Deploy complex networks from YAML-based configurations
- **Rich Template System**: Builtin templates for Debian, Kali, Windows 11, Server 2022, plus community templates for Commando VM, FLARE VM, REMnux, and more
- **Flexible Networking**: Up to 255 VLANs with customizable firewall rules and internal DNS
- **Secure Remote Access**: Built-in WireGuard server with SSH, RDP, VNC, and KasmVNC
- **VM Isolation**: Internet isolation, snapshot management, and selective domain/IP allowlisting
- **Pre-Built Environments**: GOAD, ADCS, Elastic Security, Malware Labs, Pivot Labs, CTF environments, and SANS workshop configurations

## Getting Started

```bash
# Quick install on Proxmox 8/9 or Debian 12/13
curl -s https://ludus.cloud/install | bash

# Requirements: x86_64 CPU (Passmark 6000+), 32GB+ RAM, 200GB+ storage
```

## Use Cases

- **Red Team Training**: Practice AD attack chains and exploitation techniques
- **Blue Team Training**: Detection engineering with Elastic Security and SIEM query development
- **CTF Preparation**: Rapidly deploy challenge environments
- **Security Research**: Malware analysis and vulnerability research in isolated environments
- **Custom Lab Creation**: Build tailored ranges for specific training scenarios
