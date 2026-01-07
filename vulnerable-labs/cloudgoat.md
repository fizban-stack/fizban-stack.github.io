---
layout: vulnerable-lab
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

CloudGoat allows security professionals to deploy vulnerable AWS environments quickly and practice cloud penetration testing techniques in a controlled manner. Each scenario represents real-world misconfigurations found in AWS environments.

## Key Features

- **Multiple Scenarios**: Pre-built vulnerable AWS environments
- **Realistic Configurations**: Based on real-world cloud security issues
- **AWS Native**: Uses actual AWS services and infrastructure
- **Automated Deployment**: Quick setup with Terraform
- **Complete Teardown**: Clean removal of all resources
- **Scenario Variety**: IAM, S3, Lambda, EC2, and more

## Available Scenarios

### IAM Privilege Escalation
- **iam_privesc_by_rollback**: IAM policy version manipulation
- **iam_privesc_by_attachment**: Policy attachment exploitation
- **iam_privesc_by_key_rotation**: Access key rotation abuse

### Cloud Service Exploitation
- **cloud_breach_s3**: S3 bucket misconfigurations
- **ec2_ssrf**: Server-side request forgery via EC2 metadata
- **lambda_privesc**: Lambda function privilege escalation
- **rce_web_app**: Web application to RCE

### Data Exfiltration
- **cicd**: CI/CD pipeline vulnerabilities
- **detection_evasion**: Evading CloudTrail logging

## Prerequisites

- AWS Account with CLI configured
- Terraform installed
- Python 3.6+
- Basic AWS knowledge

## Installation

```bash
# Clone the repository
git clone https://github.com/RhinoSecurityLabs/cloudgoat.git
cd cloudgoat

# Install dependencies
pip3 install -r requirements.txt

# Configure CloudGoat
./cloudgoat.py config profile
./cloudgoat.py config whitelist --auto
```

## Deployment

```bash
# List available scenarios
./cloudgoat.py list

# Create a scenario
./cloudgoat.py create [scenario_name]

# The output will provide:
# - Scenario resources
# - Starting credentials
# - Objective description
```

## Cleanup

```bash
# Destroy a specific scenario
./cloudgoat.py destroy [scenario_name]

# Destroy all scenarios
./cloudgoat.py destroy all
```

## Learning Path

1. **Start Simple**: Begin with IAM privilege escalation scenarios
2. **Progress to Services**: Explore S3, Lambda, and EC2 scenarios
3. **Advanced Attacks**: Multi-step attack chains
4. **Real-World Practice**: Combine multiple techniques

## Security Considerations

- **Cost Management**: Monitor AWS costs during scenarios
- **Region Selection**: Deploy in isolated AWS regions
- **Resource Limits**: Set AWS service quotas
- **Whitelist IPs**: Restrict access to your IP only
- **Regular Cleanup**: Always destroy scenarios after use

## Use Cases

- **Cloud Security Training**: Hands-on AWS security practice
- **Red Team Exercises**: Practice cloud attack techniques
- **Blue Team Training**: Understand attacker methodologies
- **Tool Development**: Test cloud security tools
- **Interview Prep**: Demonstrate cloud security knowledge

## Community Scenarios

The community contributes additional scenarios regularly. Check the GitHub repository for the latest additions and updates.

## Best Practices

- Always work in a dedicated AWS account
- Enable AWS CloudTrail for learning
- Use AWS budgets and billing alerts
- Document your attack paths
- Share learnings with the community

CloudGoat is an essential tool for anyone serious about AWS security, providing hands-on experience with real cloud vulnerabilities in a safe, controlled environment.
