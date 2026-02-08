---
layout: detail-page
back_url: /vulnerable-labs
back_text: Back to Vulnerable Labs
breadcrumb_url: /vulnerable-labs
breadcrumb_text: Vulnerable Labs
title: AzureGoat
focus: Azure cloud security and penetration testing
type: Cloud
category: Cloud & Infrastructure
description: INE Labs' vulnerable-by-design Azure infrastructure featuring OWASP Top 10 web vulnerabilities, serverless security issues, and Azure-specific attack paths deployed via Terraform.
image: vulnerable-labs/azuregoat.webp
github: https://github.com/ine-labs/AzureGoat
website: https://github.com/ine-labs/AzureGoat
---

AzureGoat is INE Labs' vulnerable-by-design Azure infrastructure created for practicing Azure cloud security, penetration testing, and learning Azure-specific attack techniques in a controlled environment.

## Overview

Similar to CloudGoat for AWS, AzureGoat provides intentionally misconfigured Azure environments deployed through Infrastructure-as-Code (Terraform). It combines OWASP Top 10 web application vulnerabilities with Azure-specific security misconfigurations, offering a comprehensive platform for cloud security training.

The project features a serverless blog application with multiple escalation paths, designed for black-box attack simulation across various Azure components.

## Key Features

- **Infrastructure-as-Code**: Terraform deployment for reproducibility
- **OWASP Top 10 (2021)**: Latest web application vulnerabilities
- **Azure-Specific Scenarios**: Real Azure service misconfigurations
- **Multiple Attack Paths**: Various privilege escalation routes
- **Black-Box Approach**: Realistic penetration testing scenarios
- **Complete Control**: Deploy in your own Azure account
- **Serverless Focus**: Azure Functions exploitation

## Technology Stack

- **Compute**: Azure Functions, App Services, Azure Automation
- **Storage**: Blob Storage, CosmosDB, Azure SQL Database
- **Identity**: Azure AD / Entra ID, Managed Identities, Service Principals, RBAC
- **Security**: Azure Key Vault, Application Insights
- **Infrastructure**: Terraform, Azure Resource Manager

## Getting Started

```bash
# Clone and deploy
git clone https://github.com/ine-labs/AzureGoat.git
cd AzureGoat

az login
az account set --subscription "<subscription-id>"

cd modules/module-1
terraform init
terraform plan
terraform apply
```

## Vulnerability Categories

- Broken Access Control and IDOR
- Cryptographic Failures and Sensitive Data Exposure
- SQL Injection, XSS, and Command Injection
- Security Misconfiguration and Default Credentials
- Vulnerable and Outdated Components
- Authentication and Session Management Failures
- Insecure CI/CD and Deserialization
- Insufficient Logging and Monitoring
- Server-Side Request Forgery (SSRF)
- Overly Permissive RBAC and Service Principal Abuse
- Storage Account Misconfigurations and SAS Token Leakage
- Azure Functions Authentication Bypass
- CosmosDB Access Control Flaws
- Automation Runbook Exploitation

## Use Cases

- **Cloud Security Training**: Hands-on Azure security labs and red/blue team exercises
- **Certification Preparation**: AZ-500 and cloud penetration testing certifications
- **IaC Security Auditing**: Review Terraform configurations and develop security baselines
- **Security Research**: Understand Azure-specific attack vectors and tool development
- **Developer Education**: Learn secure Azure configurations and defense-in-depth principles
