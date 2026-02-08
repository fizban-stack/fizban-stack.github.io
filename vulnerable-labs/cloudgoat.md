---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: CloudGoat
focus: AWS exploitation and privilege escalation
type: Cloud
category: Cloud & Infrastructure
description: Rhino Security Labs' vulnerable-by-design AWS deployment tool featuring multiple scenarios for testing cloud penetration testing skills and AWS security knowledge.
image: vulnerable-labs/cloudgoat.webp
github: https://github.com/RhinoSecurityLabs/cloudgoat
website: https://rhinosecuritylabs.com/aws/cloudgoat-vulnerable-design-aws-environment/
---

CloudGoat is Rhino Security Labs' "Vulnerable by Design" AWS deployment tool. It creates intentionally vulnerable AWS infrastructure for cloud security training, testing, and skill development.

## Overview

CloudGoat allows security professionals to deploy vulnerable AWS environments quickly and practice cloud penetration testing techniques in a controlled manner. Each scenario represents real-world misconfigurations found in AWS environments, covering IAM privilege escalation, S3 bucket misconfigurations, Lambda exploitation, EC2 SSRF, CI/CD pipeline vulnerabilities, and detection evasion techniques.

## Key Features

- **Multiple Scenarios**: Pre-built vulnerable AWS environments with specific objectives
- **Realistic Configurations**: Based on real-world cloud security misconfigurations
- **AWS Native**: Uses actual AWS services (IAM, S3, Lambda, EC2)
- **Automated Deployment**: Quick setup and teardown with Terraform and Python
- **IP Whitelisting**: Restrict access to your IP only
- **Community Scenarios**: Regularly contributed additional scenarios

## Getting Started

```bash
git clone https://github.com/RhinoSecurityLabs/cloudgoat.git
cd cloudgoat
pip3 install -r requirements.txt

# Configure
./cloudgoat.py config profile
./cloudgoat.py config whitelist --auto

# Deploy a scenario
./cloudgoat.py create [scenario_name]

# Cleanup
./cloudgoat.py destroy [scenario_name]
```

## Vulnerability Categories

- IAM Policy Version Rollback and Privilege Escalation
- IAM Policy Attachment Exploitation
- Access Key Rotation Abuse
- S3 Bucket Misconfigurations
- EC2 SSRF and Metadata Service Exploitation
- Lambda Function Privilege Escalation
- Web Application to Remote Code Execution
- CI/CD Pipeline Vulnerabilities
- CloudTrail Detection Evasion

## Use Cases

- **Cloud Security Training**: Hands-on AWS security practice with real services
- **Red Team Exercises**: Practice cloud-specific attack techniques
- **Blue Team Training**: Understand attacker methodologies and detection opportunities
- **Tool Development**: Test and validate cloud security tools
- **Interview and Certification Preparation**: Demonstrate practical AWS security knowledge
