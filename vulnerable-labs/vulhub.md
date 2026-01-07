---
layout: vulnerable-lab
title: Vulhub
focus: Pre-built vulnerability environments for CVEs
type: Docker Compose
category: CVE Collection
description: Massive collection of 200+ pre-built vulnerable Docker environments for real-world CVEs, making vulnerability research and PoC testing accessible.
image: vulnerable-labs/vulhub.webp
github: https://github.com/vulhub/vulhub
website: https://vulhub.org/
---

Vulhub is a comprehensive collection of pre-built vulnerable environments based on Docker-Compose, covering 200+ real-world CVEs.

## Overview

Vulhub makes vulnerability research accessible by providing ready-to-deploy vulnerable environments for testing exploits, developing security tools, and learning about real vulnerabilities.

## Coverage

- **200+ Vulnerabilities**: Real CVEs with PoCs
- **Multiple Categories**: Web, infrastructure, applications
- **Active Maintenance**: Regular updates
- **One-Command Deploy**: Simple setup

## Categories

### Web Applications
- WordPress, Drupal, Joomla vulnerabilities
- CMS exploits
- Web framework issues

### Infrastructure
- Apache, Nginx misconfigurations
- Redis, MongoDB vulnerabilities
- Database exploits

### Applications
- Java deserialization
- PHP vulnerabilities
- Python framework issues

### Services
- SMB, FTP vulnerabilities
- Mail server exploits
- DNS issues

## Deployment

```bash
# Clone repository
git clone https://github.com/vulhub/vulhub.git
cd vulhub

# Navigate to specific vulnerability
cd [vulnerability-directory]

# Deploy
docker-compose up -d
```

## Use Cases

- CVE research and analysis
- Exploit development
- Security tool testing
- Vulnerability scanning validation
- Security training
- Bug bounty preparation

## Features

- Isolated environments
- Reproducible setups
- Documented vulnerabilities
- Version-specific targets
- Easy cleanup

Essential for security researchers, penetration testers, and anyone involved in vulnerability assessment.
