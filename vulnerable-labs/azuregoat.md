---
layout: vulnerable-lab
title: AzureGoat
focus: Azure security and exploitation
type: Cloud
category: Cloud & Infrastructure
description: A vulnerable Azure infrastructure setup for learning Azure security, covering storage misconfigurations, identity issues, and cloud-native vulnerabilities.
image: vulnerable-labs/azuregoat.webp
github: https://github.com/ine-labs/AzureGoat
website: https://github.com/ine-labs/AzureGoat
---

AzureGoat is INE's vulnerable-by-design Azure infrastructure for practicing Azure cloud security and penetration testing.

## Overview

Similar to CloudGoat for AWS, AzureGoat provides intentionally misconfigured Azure environments to help security professionals learn Azure-specific attack techniques and defensive strategies.

## Key Features

- **Azure-Specific Scenarios**: Real Azure service vulnerabilities
- **Multiple Attack Paths**: Various exploitation techniques
- **Automated Deployment**: Terraform-based setup
- **Complete Scenarios**: End-to-end attack chains
- **Learning Resources**: Detailed walkthroughs

## Covered Services

- Azure Storage Accounts
- Azure Functions
- Azure Key Vault
- Azure AD / Entra ID
- Azure SQL Database
- Virtual Machines
- Azure App Services
- Managed Identities

## Common Vulnerabilities

### Identity and Access
- Overly permissive RBAC roles
- Service principal misconfigurations
- Managed identity abuse
- Azure AD token exploitation

### Storage Security
- Public blob containers
- Unencrypted storage accounts
- SAS token leakage
- Storage account key exposure

### Compute Resources
- VM credential theft
- Azure Function code injection
- Container escape scenarios
- Automation account abuse

## Deployment

```bash
git clone https://github.com/ine-labs/AzureGoat
cd AzureGoat

# Configure Azure credentials
az login

# Deploy scenario
terraform init
terraform apply
```

## Learning Objectives

- Understand Azure security model
- Practice Azure penetration testing
- Learn defensive Azure strategies
- Identify common misconfigurations
- Master Azure security tools

## Use Cases

- Azure security training
- Red team exercises
- Blue team detection development
- Security tool testing
- Certification preparation (AZ-500)

AzureGoat is essential for security professionals working with Azure environments.
