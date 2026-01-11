---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: DetectionLab
focus: Blue team training and threat detection
type: Multi-VM Lab
category: Enterprise & Active Directory
description: Chris Long's lab environment for testing security monitoring tools with pre-configured logging (Splunk, ELK), domain controller, and endpoint security solutions.
image: vulnerable-labs/detectionlab.webp
github: https://github.com/clong/DetectionLab
website: https://detectionlab.network/
---

DetectionLab is Chris Long's blue team training lab providing a complete Active Directory environment with pre-configured logging, monitoring, and detection tools.

## Overview

Unlike purely offensive labs, DetectionLab focuses on the defensive side, providing a platform to test detection capabilities, develop security content, and practice incident response.

## Lab Components

### Virtual Machines
- **Domain Controller**: Windows 2016 Server
- **Windows 10 Client**: Endpoint with Sysmon
- **Fleet Server**: Kolide osquery management
- **Logger**: Splunk/ELK stack

### Pre-Installed Tools
- **Splunk**: SIEM and log analysis
- **Elastic Stack**: Alternative SIEM option
- **Sysmon**: Advanced system monitoring
- **osquery**: Endpoint visibility
- **Zeek**: Network security monitoring
- **Suricata**: IDS/IPS
- **Velociraptor**: Endpoint visibility and hunting

## Key Features

- **Automated Build**: Vagrant and Packer automation
- **Full Logging**: Comprehensive telemetry collection
- **Multiple SIEM Options**: Splunk and ELK included
- **Attack Simulation**: Built-in attack scenarios
- **Security Onion**: Network security monitoring
- **Purple Team Ready**: Both offensive and defensive tools

## Deployment Options

### Vagrant (Recommended)
```bash
git clone https://github.com/clong/DetectionLab.git
cd DetectionLab/Vagrant
vagrant up
```

### Cloud Deployment
- AWS support
- Azure support
- Terraform configurations

### System Requirements
- 64GB RAM recommended
- 250GB disk space
- Virtualization support (VT-x/AMD-V)

## Use Cases

### Blue Team Training
- SIEM query development
- Alert tuning and creation
- Log source configuration
- Threat hunting techniques

### Purple Team Exercises
- Attack simulation
- Detection development
- Visibility gaps identification
- Response procedure testing

### Tool Testing
- SIEM capability validation
- EDR solution evaluation
- Network monitoring tools
- Incident response platforms

### Education
- SOC analyst training
- Detection engineering courses
- Security monitoring workshops
- Certification preparation

## Attack Scenarios Included

- Credential dumping
- Lateral movement
- PowerShell attacks
- Mimikatz execution
- Kerberoasting
- DCSync attacks

## Detection Opportunities

- Process execution logging
- Network connection monitoring
- PowerShell script block logging
- File creation and modification
- Registry changes
- Authentication events

## Learning Path

1. **Environment Familiarization**: Explore pre-configured logging
2. **Baseline Establishment**: Understand normal activity
3. **Attack Simulation**: Generate malicious activity
4. **Detection Development**: Create alerts and queries
5. **Refinement**: Tune detections to reduce false positives
6. **Documentation**: Build detection playbooks

## Community Resources

- Active GitHub repository
- Regular updates and improvements
- Community-contributed detection rules
- Attack simulation scripts
- Blog posts and tutorials

DetectionLab is essential for security analysts, detection engineers, and anyone focused on the defensive side of cybersecurity.
